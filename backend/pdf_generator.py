import os

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch


REPORT_FOLDER = "reports"

os.makedirs(REPORT_FOLDER, exist_ok=True)


def generate_pdf(filename, result, suggestions):

    try:

        pdf_filename = filename + "_report.pdf"

        pdf_path = os.path.join(REPORT_FOLDER, pdf_filename)


        styles = getSampleStyleSheet()


        title_style = styles["Heading1"]

        heading_style = styles["Heading2"]

        normal_style = styles["BodyText"]


        doc = SimpleDocTemplate(pdf_path)


        elements = []


        # TITLE
        elements.append(Paragraph("VulnERR Security Report", title_style))
        elements.append(Spacer(1, 20))


        # FILE NAME
        elements.append(Paragraph(f"<b>File Name:</b> {filename}", normal_style))
        elements.append(Spacer(1, 10))


        # STATUS
        elements.append(Paragraph("<b>Analysis Result:</b>", heading_style))

        elements.append(Paragraph(f"Status: {result.get('status','')}", normal_style))

        elements.append(Paragraph(f"Severity: {result.get('severity','')}", normal_style))

        elements.append(Paragraph(f"Message: {result.get('message','')}", normal_style))

        elements.append(Spacer(1, 20))


        # SUGGESTIONS
        if suggestions:

            elements.append(Paragraph("<b>AI Suggestions:</b>", heading_style))

            elements.append(Paragraph(suggestions.replace("\n", "<br/>"), normal_style))


        doc.build(elements)


        print("PDF GENERATED:", pdf_path)


        return pdf_path


    except Exception as e:

        print("PDF GENERATION ERROR:", str(e))

        raise e
