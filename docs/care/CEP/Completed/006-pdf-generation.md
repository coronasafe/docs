# CEP-6: PDF Generation in Care

# Proposal Preface

Care is currently using `django-hardcopy` to generate discharge reports, which utilizes Chromium Headless for rendering Django templates in Chrome and converting them to PDF. However, this method is not very efficient and could be improved by using a native Python package that can directly convert HTML to PDF without the need for browser rendering. This would result in lower resource consumption and increased efficiency.

Currently, this function is responsible for generating PDFs, and the following is the Django template used for generating reports using Tailwind CSS and Django templates.

## Drawbacks of Current Approach

- **Dependency on Chromium Headless**: Adds significant overhead and resource consumption.
- **Increased Docker Image Size**: Including Chromium Headless impacts deployment and scalability.
- **Slower and Less Efficient Rendering**: Generating PDFs through browser emulation is slower and less efficient compared to native PDF generation.
- **Higher Memory Usage**: Requires higher memory usage during PDF generation, potentially affecting performance and responsiveness.
- **Lack of Recent Maintenance**: The absence of recent maintenance and updates for `django-hardcopy`, last seen in July 2018, has raised concerns regarding possible security vulnerabilities.


# Proposed Solution

### Initial Solution Approach

Initially, I considered utilizing a Python library like `WeasyPrint` or `xhtml2pdf`. Both libraries offer Django-friendly code. Here are the respective documentation links for further reference:
- [Xhtml2pdf](https://xhtml2pdf.readthedocs.io/)
- [WeasyPrint](https://weasyprint.readthedocs.io/)

After conducting further research and receiving feedback, I came across a recent [article](https://zerodha.tech/blog/1-5-million-pdfs-in-25-minutes/) by Zerodha that discussed PDF generation. This is where I discovered Typst.

### Final Solution (Using Typst)

Initially, PDFs were generated from HTML using Puppeteer, which involved spawning headless instances of Chrome. According to the Zerodha article, their earlier tech stack, similar to ours, relied on headless Chrome for PDF rendering, which proved inefficient at scale. However, they transitioned to Typst, noting its efficiency and scalability benefits. This sparked my interest, leading to extensive research validating Typst's effectiveness and credibility through various references.

We can also refer to the [official documentation](https://typst.app/docs/), to get detailed information related to the tool.

I engaged with the Typst community and moderators on Discord, where I received predominantly positive feedback and had productive interactions. The notable advantage I found with Typst is its freshness compared to competitors like LaTeX. While it may have fewer available resources for reference, my experience within the Typst community has been positive. The community is extremely helpful and responsive, making any potential lack of resources a minor concern.

By adopting Typst for our PDF generation needs, we can significantly improve the efficiency and scalability of our discharge report generation process, ensuring lower resource consumption and enhanced performance.


# Implementation Plan

- **Step 1:** Update Docker Files to Add Typst Dependencies

- **Step 2:** Update Helper Functions for Typst and Create a Wrapper for Typst to Compile Templates

- **Step 3:** Create a Static Template for Our Report

- **Step 4:** Integrate Typst with Django Templates in Our Project

- **Step 5:** Create Tests

- **Step 6:** Remove All Previous Dependencies and Remove Chromium and django-hardcopy

- **Step 7:** Update production files for the changes 


### Step 1: Update Docker Files to Add Typst Dependencies

Since we don't have an apt installation for Typst, we can download it from the official releases according to the build we are working on. Here is how we can update our Dockerfile:

```docker
FROM python:3.11-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ENV PATH /venv/bin:$PATH

ARG TYPST_VERSION=0.11.0

RUN apt-get update && apt-get install --no-install-recommends -y \
  build-essential libjpeg-dev zlib1g-dev \
  libpq-dev gettext wget curl gnupg git \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# Download and install Typst for the correct architecture
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        TYPST_ARCH="x86_64-unknown-linux-musl"; \
    elif [ "$ARCH" = "arm64" ]; then \
        TYPST_ARCH="aarch64-unknown-linux-musl"; \
    else \
        echo "Unsupported architecture: $ARCH"; \
        exit 1; \
    fi && \
    wget -O typst.tar.xz https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-${TYPST_ARCH}.tar.xz && \
    tar -xf typst.tar.xz && \
    mv typst-${TYPST_ARCH}/typst /usr/local/bin/typst && \
    chmod +x /usr/local/bin/typst && \
    rm -rf typst.tar.xz typst-${TYPST_ARCH}

# use pipenv to manage virtualenv
RUN python -m venv /venv
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --categories "packages dev-packages"


COPY . /app

RUN python3 /app/install_plugins.py

HEALTHCHECK \
  --interval=10s \
  --timeout=5s \
  --start-period=10s \
  --retries=48 \
  CMD ["/app/scripts/healthcheck.sh"]

WORKDIR /app

```

### Step 2: Update Helper Functions and Create Typst Wrapper

First of all we have to create a wrapper function to allow our typ binary to compile our template.

```python
def compile_typ(output_file, data):
    try:
        content = render_to_string("reports/example.typ", context=data)
        process = subprocess.run(
            ["typst", "compile", "-", output_file],
            input=content.encode("utf-8"),
            capture_output=True,
            check=True,
        )
        logging.info(
            f"Successfully Compiled Summary pdf for {data['consultation'].external_id}"
        )
        return True
    except subprocess.CalledProcessError as e:
        logging.error(
            f"Error compiling summary pdf for {data['consultation'].external_id}: {e.output.decode('utf-8')}"
        )
        return False
    except Exception as e:
        logging.error(
            f"Unexpected error compiling summary pdf: {e}"
        )
        return False
```
After creating a wrpper we can update our helper functions like :
```py
def generate_discharge_summary_pdf(data, file):
    logger.info(
        f"Generating Discharge Summary pdf for {data['consultation'].external_id}"
    )
    compile_typ(output_file=file.name, data=data)
    logger.info(
        f"Successfully Generated Discharge Summary pdf for {data['consultation'].external_id}"
    )
```

### Step 3: Create Static Template for Reports

Completed it. Progress can be seen here - [Report Template](https://typst.app/project/rBahq8CbsixUHYwri4KtmO)
Now this document just cointains different components that I've used in my template.

### Step 4: Integrate Typst with Django Templates in Our Project
Updated the previous template using HTML/CSS with `Typst`. Template can be found [here](https://github.com/coronasafe/care/blob/5d5ca4630cebd168f3ca8a75ca2dae9bdc6110fd/care/templates/reports/patient_discharge_summary_pdf_template.typ)

### Step 5: Create Tests
Generating `PNG` of the pdf using typst and comparing using `Pillow` library. It involves have sample png images of the pdf in `care/facility/tests/sample_reports` folder which are to be compared with the newly generated pdf pngs , if identical the test cases passes, else throws error.


To Update the sample `PNG` files, we can update the [test_compile_typ() function](https://github.com/ohcnetwork/care/blob/develop/care/facility/tests/test_pdf_generation.py#L41-L100) by adding the below code to test function below line 59.
```python
subprocess.run(
    ["typst", "compile", "-", sample_file_path, "--format", "png"],
    input=content.encode("utf-8"),
    capture_output=True,
    check=True,
    cwd="/",
)
```
To investigate any errors, we can remove the [finally block](https://github.com/ohcnetwork/care/blob/develop/care/facility/tests/test_pdf_generation.py#L89-L100) from our [test_compile_typ() function](https://github.com/ohcnetwork/care/blob/develop/care/facility/tests/test_pdf_generation.py#L41-L100). It'll generate the `test_output{n}.png` files in `care/facility/tests/sample_reports` folder, from where you can use a image diff checker to investigate the differences.  

if in future if we decide to add more data to the test function and the number of pages increases, then one should also update the [number_of_pngs_generated](https://github.com/ohcnetwork/care/blob/develop/care/facility/tests/test_pdf_generation.py#L68) number to the number of pages of pdf generated.
### Step 6: Remove All Previous Dependencies and Remove Chromium and django-hardcopy
Updated all the functions utilising the older dependecies with the newer versions and removed `django-hardcopy` from pipfile and `chromium` from docker file.

### Step 7:  Update production files for the changes
Updated prod.Dockerfile to remove older dependencies and added newer dependecies.


# Updates in the template are listed below

### Patient Detail section

- Remove `Date of Birth` field


### Admission Details Section

- Removed `Decision After Consultation` field
- Removed `Examination details and Clinical conditions` field
- Removed `From` field
- Added `Duration of Admission` field , which shows the time span the patient was admitted (discharge date - encounter date)
- Added `Admitted to` field , which shows the bed and it's type
- Added `Diagnosis at admission` field which shows List the ICD-11 in the following order - confirmed,provisional, unconfirmed, differential
- Added `Reported Allergies` field, which shows the list of allergies
- Added `Symptoms at admission` field ,which show list of all active symptoms at the time of admission


### Health Insurance Details

- kept the table as the last item below discharge details

### Treatment Summary Section

- Combined `Prescriptions` medication details into a single table with updated format
- Removed `Treatment Plan`
- Removed `General Instructions`
- Removed `Special Instructions`
- Removed `Prescription notes` it is not relevant for discharge summary


### Discharge Summary Section

- updated `Discharge Notes` to `Discharge Advice`
- Added `Discharge Prescription` table

### Others

>  - Removed `Symptoms` and `Diagnosis (ICD-11)` tables and `Health Status at admission` section
>  - Removed `Daily Round` section
>  - Created three new `templatetags` , one to `format prescription`, one to `format_to_sentence_case` and one to `handle empty data`
>  - Added conditions to update fields name according to admission status 

  


# Results
- Typst is 8-15 times faster in generating PDFs
- Container size decreased by 30%
- Typst is 10-15% more memory efficient
- We eliminate the overhead associated with browser-based rendering, resulting in a more efficient and scalable process.
