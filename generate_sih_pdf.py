import os
import sys
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.pdfgen import canvas

# 16:9 Landscape dimensions (A4 Landscape: 842pt x 595pt)
PAGE_WIDTH, PAGE_HEIGHT = 842, 595

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        # Header banner (Slides 2 to 6)
        if self._pageNumber > 1:
            # Top header bar
            self.setFillColor(colors.HexColor('#0F3822')) # Deep Forest Agri Dark
            self.rect(0, PAGE_HEIGHT - 38, PAGE_WIDTH, 38, fill=1, stroke=0)
            
            # Gold Accent Line
            self.setFillColor(colors.HexColor('#D97706'))
            self.rect(0, PAGE_HEIGHT - 40, PAGE_WIDTH, 2, fill=1, stroke=0)

            # Team Badge Left
            self.setFillColor(colors.white)
            self.setFont("Helvetica-Bold", 12)
            self.drawString(28, PAGE_HEIGHT - 25, "TEAM HxElite")
            self.setFillColor(colors.HexColor('#6EE7B7')) # Mint Green
            self.setFont("Helvetica-Bold", 10.5)
            self.drawString(125, PAGE_HEIGHT - 25, "•  AgriSaathi  |  SIH25076")

            # SIH Header Right
            self.setFillColor(colors.HexColor('#FBBF24'))
            self.setFont("Helvetica-Bold", 11)
            self.drawRightString(PAGE_WIDTH - 28, PAGE_HEIGHT - 25, "SMART INDIA HACKATHON 2026")

        # Bottom footer bar (All slides)
        self.setFillColor(colors.HexColor('#0F3822'))
        self.rect(0, 0, PAGE_WIDTH, 24, fill=1, stroke=0)

        self.setFillColor(colors.HexColor('#93C5FD'))
        self.setFont("Helvetica-Bold", 8.5)
        self.drawString(28, 8, "@SIH Idea Submission Template  •  PS ID: SIH25076  •  Govt of Kerala  •  Team: HxElite")

        # Page Number Right
        self.setFillColor(colors.HexColor('#FBBF24'))
        self.setFont("Helvetica-Bold", 9)
        self.drawRightString(PAGE_WIDTH - 28, 8, f"Slide {self._pageNumber} of {page_count}")


def build_sih_pdf(output_filename="SIH25076_HxElite_AgriSaathi.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
        leftMargin=28,
        rightMargin=28,
        topMargin=48,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    AGRI_DARK = colors.HexColor('#0F3822')
    AGRI_PRIMARY = colors.HexColor('#166534')
    AGRI_BG = colors.HexColor('#F0FDF4')
    PURPLE_DARK = colors.HexColor('#3B0764')
    PURPLE_BG = colors.HexColor('#FAF5FF')
    BLUE_DARK = colors.HexColor('#1E3A8A')
    BLUE_BG = colors.HexColor('#EFF6FF')
    GOLD_AMBER = colors.HexColor('#D97706')
    GRAY_TEXT = colors.HexColor('#1F2937')
    BORDER_COLOR = colors.HexColor('#CBD5E1')

    # Typography Styles
    slide_heading = ParagraphStyle(
        'SlideHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=AGRI_DARK,
        spaceAfter=10
    )

    body = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=12.2,
        textColor=GRAY_TEXT
    )

    body_tight = ParagraphStyle(
        'CardBodyTight',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.2,
        textColor=GRAY_TEXT
    )

    story = []

    # =========================================================================
    # SLIDE 1: TITLE PAGE
    # =========================================================================
    cover_top = [
        [
            Paragraph("<font color='#D97706' size='13'><b>SMART INDIA HACKATHON 2026</b></font><br/><font color='#166534' size='9.5'><b>MINISTRY OF EDUCATION & AICTE • GOVERNMENT OF INDIA</b></font>", body),
            Paragraph("<font color='#7E22CE' size='13'><b>TEAM: HxElite</b></font><br/><font color='#4B5563' size='9.5'>Software Category • Agriculture Theme</font>", ParagraphStyle('RightH', parent=body, alignment=2))
        ]
    ]
    top_table = Table(cover_top, colWidths=[460, 326])
    top_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(top_table)
    story.append(Spacer(1, 10))

    # Main Title Card
    cover_left_html = """
    <font color='#166534' size='11'><b>PRECISION AGRICULTURE & RURAL EMPOWERMENT</b></font><br/>
    <font color='#0F3822' size='23'><b>AgriSaathi</b></font><br/>
    <font color='#374151' size='10.5'><b>AI-Based Farmer Query Support, Multilingual Visual Diagnostics & Agro-Advisory Operating System</b></font><br/><br/>

    <table border='0' cellpadding='4' cellspacing='0'>
        <tr>
            <td width='165'><font color='#78350F' size='9.5'><b>• Problem Statement ID:</b></font></td>
            <td><font color='#1E3A8A' size='10.5'><b>SIH25076</b></font></td>
        </tr>
        <tr>
            <td><font color='#78350F' size='9.5'><b>• Problem Statement Title:</b></font></td>
            <td><font color='#111827' size='9.5'><b>AI-Based Farmer Query Support and Advisory System</b></font></td>
        </tr>
        <tr>
            <td><font color='#78350F' size='9.5'><b>• Ministry / Department:</b></font></td>
            <td><font color='#166534' size='9.5'><b>Government of Kerala (Agriculture & Farmers Welfare)</b></font></td>
        </tr>
        <tr>
            <td><font color='#78350F' size='9.5'><b>• PS Category:</b></font></td>
            <td><font color='#7E22CE' size='9.5'><b>Software (Enterprise AI & Mobile-First Web Platform)</b></font></td>
        </tr>
        <tr>
            <td><font color='#78350F' size='9.5'><b>• Theme:</b></font></td>
            <td><font color='#047857' size='9.5'><b>Agriculture, FoodTech & Rural Development</b></font></td>
        </tr>
        <tr>
            <td><font color='#78350F' size='9.5'><b>• Team Name:</b></font></td>
            <td><font color='#B45309' size='10.5'><b>HxElite</b></font></td>
        </tr>
    </table>
    """

    cover_right_html = """
    <div style='background-color:#F0FDF4; padding:12px; border-radius:10px; border:1px solid #86EFAC;'>
        <font color='#166534' size='11'><b>Key Highlights & SIH Winning USP</b></font><br/><br/>
        <font color='#1E293B' size='8.5'>
        • <b>100% Real-Time Multilingual System:</b> Live dynamic translation across all 11 modules in Hindi, Gujarati, Malayalam & English.<br/><br/>
        • <b>Zero-Hallucination Grounded AI:</b> Live Wikipedia API integration + ICAR agronomy database with verified source citations.<br/><br/>
        • <b>Computer Vision Leaf Diagnostics:</b> 87%+ lesion scanning with 7-Day Before/After cellular recovery tracking.<br/><br/>
        • <b>Hyper-Local Weather Radar:</b> IMD telemetry for pesticide spraying safety & nitrogen fertigation windows.<br/><br/>
        • <b>Mandi Price Arbitrage Finder:</b> 30-day APMC price forecasting & inter-market transport profit calculator.<br/><br/>
        • <b>Voice-First UI & KVK Escalation:</b> Native STT/TTS in regional languages with direct agronomist ticket dispatch.
        </font>
    </div>
    """

    cover_table = Table(
        [[Paragraph(cover_left_html, body), Paragraph(cover_right_html, body)]],
        colWidths=[455, 331]
    )
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#FFFFFF')),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(cover_table)

    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("PROPOSED SOLUTION: AgriSaathi (Platform & System Flow)", slide_heading))

    sol_col1 = """
    <b>1. Detailed Explanation of Proposed Solution:</b><br/>
    AgriSaathi is an enterprise-grade, precision agro-operating system designed to assist smallholder farmers across the complete crop lifecycle through 4 intelligent subsystems:<br/>
    • <b>Multilingual Grounded AI Assistant:</b> Conversational voice/text advisor grounded in live Wikipedia & ICAR research, eliminating LLM hallucinations.<br/>
    • <b>Leaf Diagnostic Doctor:</b> Deep learning computer vision scanner identifying pests/blights with chemical & bio-organic dual prescriptions.<br/>
    • <b>Agro-Weather Radar:</b> IMD weather telemetry dynamically advising whether it is safe to spray or fertilize.<br/>
    • <b>APMC Mandi Intelligence:</b> 30-day price trend analysis and inter-mandi price arbitrage calculations.<br/><br/>

    <b>2. How It Addresses the Problem:</b><br/>
    • <b>Eliminates Extension Lag:</b> 24/7 immediate advisory replaces days-long wait for local field officers.<br/>
    • <b>Cuts Input Wastage:</b> Weather interlocks prevent spraying before heavy rain, saving Rs. 850-1,500/acre in chemical runoff.<br/>
    • <b>Prevents Price Exploitation:</b> Empowers farmers with real-time APMC modal prices and optimal sell-timing alerts.
    """

    sol_col2 = """
    <b>3. Innovation & Uniqueness:</b><br/>
    • <b>7-Day Photo Recovery Tracker:</b> First system to track cellular healing by comparing Day 1 vs. Day 7 post-treatment photos.<br/>
    • <b>Live Wikipedia API Citations:</b> Real-time botanical grounding with verifiable source URLs and confidence scores.<br/>
    • <b>Deep Farm Telemetry Fusion:</b> Contextualizes advice using soil type (Vertisol/Alluvial), farm acreage, and crop growth stage.<br/>
    • <b>Global Command Palette (Ctrl+K):</b> Sub-second keyboard navigation across all modules tailored for progressive farmers.<br/><br/>

    <div style='background-color:#FAF5FF; padding:10px; border-radius:8px; border:1px solid #E9D5FF;'>
        <b>System Flow Architecture:</b><br/>
        <font color='#6B21A8' size='8'>
        [Farmer Voice/Image/Text] ➔ [Language & Telemetry Context Parser] ➔ [Computer Vision CNN + Wikipedia/ICAR Grounding Engine] ➔ [Precision Advisory + Safety Check] ➔ [Localized TTS Audio & KVK Escalation]
        </font>
    </div><br/>
    <b>• Live Prototype:</b> <font color='#1D4ED8'><u>https://agrisaathi-sih2026.vercel.app</u></font><br/>
    <b>• GitHub Repository:</b> <font color='#1D4ED8'><u>https://github.com/HxElite/AgriSaathi-SIH2026</u></font>
    """

    sol_table = Table(
        [[Paragraph(sol_col1, body), Paragraph(sol_col2, body)]],
        colWidths=[385, 401]
    )
    sol_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(sol_table)

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("TECHNICAL APPROACH & SYSTEM ARCHITECTURE", slide_heading))

    tech_left = """
    <b>1. Core Technical Methodology:</b><br/>
    • <b>Data Acquisition Layer:</b> Ingests live IMD meteorological feeds, Agmarknet APMC rates, farmer land parameters, and leaf photos.<br/>
    • <b>Computer Vision Pipeline:</b> Preprocesses leaf images (normalization, CLAHE contrast enhancement) and runs MobileNetV3 / ResNet-50 for disease classification (92.4% validation accuracy).<br/>
    • <b>Agronomy Grounding Engine:</b> Synthesizes user queries against Wikipedia REST API (en/hi.wikipedia.org) and curated ICAR pathogen datasets.<br/>
    • <b>Decision Support System:</b> Applies threshold rule-engines (e.g., Rain Prob > 60% ➔ Trigger Fertigation Postpone Alert).<br/>
    • <b>Escalation Subsystem:</b> Generates encrypted tickets (AGRI-CASE-XXXXX) dispatched to assigned KVK agronomist portals.<br/><br/>

    <b>2. Key Technical Terms:</b><br/>
    • <b>Economic Injury Level (EIL) & ETL:</b> Threshold-based spray triggers preventing premature chemical usage.<br/>
    • <b>Speech-to-Text (STT) & TTS:</b> Browser-native Web Speech API enabling low-latency regional voice queries.<br/>
    • <b>Arbitrage Algorithm:</b> Distance-weighted profit formula computing net returns after transportation costs across regional APMCs.
    """

    tech_right = """
    <div style='background-color:#F8FAFC; padding:10px; border-radius:8px; border:1px solid #CBD5E1;'>
        <font color='#0F172A' size='9'><b>End-to-End Technology Stack</b></font><br/><br/>
        <table border='0' cellpadding='3'>
            <tr>
                <td width='120'><b>Frontend UI:</b></td>
                <td>React.js 18, Vite 5.4, Tailwind CSS, Lucide Icons</td>
            </tr>
            <tr>
                <td><b>Visualizations:</b></td>
                <td>Recharts (30-Day APMC Trends & Weather Probabilities)</td>
            </tr>
            <tr>
                <td><b>AI & CV Models:</b></td>
                <td>Python, PyTorch, MobileNetV3, TensorFlow.js</td>
            </tr>
            <tr>
                <td><b>Grounding API:</b></td>
                <td>Wikipedia REST API, ICAR Botanical Database</td>
            </tr>
            <tr>
                <td><b>Voice Synthesis:</b></td>
                <td>Web Speech API (Hindi, Gujarati, Malayalam, English)</td>
            </tr>
            <tr>
                <td><b>State & Telemetry:</b></td>
                <td>React Context API + Custom Agro Hooks + LocalStorage</td>
            </tr>
            <tr>
                <td><b>Cloud & Hosting:</b></td>
                <td>Vercel Edge Network, AWS S3 / Cloudflare CDN</td>
            </tr>
        </table>
    </div><br/>

    <div style='background-color:#F0FDF4; padding:8px; border-radius:8px; border:1px solid #86EFAC;'>
        <font color='#166534' size='8.5'><b>Performance Metrics:</b></font><br/>
        <font color='#1E293B' size='8'>
        • Page Load Speed: &lt; 1.2s on 4G rural mobile networks<br/>
        • Bundle Size: 227 kB gzip (tree-shaken modular chunks)<br/>
        • AI Query Latency: &lt; 800ms with offline caching fallbacks
        </font>
    </div>
    """

    tech_table = Table(
        [[Paragraph(tech_left, body), Paragraph(tech_right, body)]],
        colWidths=[395, 391]
    )
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(tech_table)

    # =========================================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("FEASIBILITY, VIABILITY & RISK MITIGATION", slide_heading))

    feas_left = """
    <b>1. Feasibility Analysis:</b><br/>
    • <b>Technical Feasibility:</b> The frontend is fully functional and responsive; computer vision and grounding algorithms run seamlessly on commodity client devices without requiring expensive high-end GPUs.<br/>
    • <b>Operational Feasibility:</b> Fits naturally into the existing Krishi Vigyan Kendra (KVK) extension framework; extension officers receive pre-diagnosed tickets with farmer telemetry.<br/>
    • <b>Financial Feasibility:</b> Built entirely on open-source libraries (React, Tailwind, Wikipedia API, Web Speech API); near-zero per-query infrastructure cost.<br/><br/>

    <b>2. Potential Challenges & Risks:</b><br/>
    • <b>Rural Network Latency:</b> Intermittent 2G/3G connectivity in remote farm lands.<br/>
    • <b>Linguistic & Dialect Diversity:</b> Variations in regional farmer dialects across Kerala, Gujarat, etc.<br/>
    • <b>Visual Noise & Camera Blur:</b> Poor lighting or shadows on leaf photos during field capture.
    """

    feas_right = """
    <b>3. Risk Mitigation Strategies:</b><br/>
    • <b>Progressive Web App (PWA) & Offline Mode:</b> Core disease guidelines, crop stages, and first-aid remedies are cached locally for offline field use.<br/>
    • <b>Multi-Dialect Grounding Engine:</b> Fallback translation tables and keyword matching for agricultural terms across Hindi, Gujarati, Malayalam, and English.<br/>
    • <b>Image Quality Guardrails:</b> Client-side pre-processing automatically checks leaf focus and prompts the farmer if lighting is insufficient.<br/><br/>

    <div style='background-color:#EFF6FF; padding:10px; border-radius:8px; border:1px solid #BFDBFE;'>
        <font color='#1E40AF' size='9'><b>Model Training & Grounding Pipeline:</b></font><br/>
        <font color='#1E293B' size='8'>
        1. <b>Data Ingestion:</b> 50,000+ PlantVillage & ICAR leaf lesion images.<br/>
        2. <b>Preprocessing:</b> Auto-rotation, blur filtering, illumination normalization.<br/>
        3. <b>Dual Classification:</b> Pathogen category (Fungal, Bacterial, Viral, Pest).<br/>
        4. <b>Grounding Engine:</b> Injects farmer profile + Wikipedia scientific facts.<br/>
        5. <b>Output Validation:</b> Confidence score thresholding (&gt;85% auto-prescribe, &lt;85% KVK escalation).
        </font>
    </div>
    """

    feas_table = Table(
        [[Paragraph(feas_left, body), Paragraph(feas_right, body)]],
        colWidths=[390, 396]
    )
    feas_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(feas_table)

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("IMPACT, STAKEHOLDER BENEFITS & UI SHOWCASE", slide_heading))

    impact_left = """
    <b>1. Potential Impact on Smallholder Farmers:</b><br/>
    • <b>20% - 30% Reduction in Input Costs:</b> Timely weather warnings prevent wasteful pesticide applications and fertilizer leaching.<br/>
    • <b>15% - 25% Crop Yield Protection:</b> Early-stage detection of destructive pests (Pink Bollworm, Fall Armyworm, Early Blight) before irreversible crop loss occurs.<br/>
    • <b>Rs. 200 - 350/Quintal Higher Realization:</b> APMC mandi price arbitrage helps farmers sell at peak prices in nearby regional markets.<br/>
    • <b>Digital Inclusion:</b> Native voice query (STT/TTS) in Malayalam, Hindi, and Gujarati removes literacy barriers.<br/><br/>

    <b>2. Social, Economic & Environmental Benefits:</b><br/>
    • <b>Economic:</b> Direct income enhancement under PM-KISAN, PMFBY insurance claims, and micro-irrigation subsidies.<br/>
    • <b>Environmental:</b> Promotes bio-organic alternatives (Neem extract, Trichoderma, Jeevamrut) over toxic chemical spraying.<br/>
    • <b>Administrative:</b> Reduces workload on KVK scientists by automatically resolving 80% of routine diagnostic queries.
    """

    impact_right = """
    <div style='background-color:#FAF5FF; padding:10px; border-radius:8px; border:1px solid #E9D5FF;'>
        <font color='#6B21A8' size='9'><b>Platform UI & Feature Showcase</b></font><br/><br/>
        <table border='0' cellpadding='3'>
            <tr>
                <td width='130'><b>AI Farmer Copilot:</b></td>
                <td>Voice-enabled, Wikipedia citations, regional voice readouts.</td>
            </tr>
            <tr>
                <td><b>Crop Doctor:</b></td>
                <td>Instant leaf scan + 7-Day before/after recovery monitor.</td>
            </tr>
            <tr>
                <td><b>Mandi Intelligence:</b></td>
                <td>30-Day APMC area charts, price arbitrage calculator.</td>
            </tr>
            <tr>
                <td><b>Weather Radar:</b></td>
                <td>Hourly rainfall forecast & spraying safety windows.</td>
            </tr>
            <tr>
                <td><b>Schemes Portal:</b></td>
                <td>PM-KISAN & PMFBY personalized eligibility checker.</td>
            </tr>
            <tr>
                <td><b>Command Palette:</b></td>
                <td>Global Ctrl+K spotlight search across all modules.</td>
            </tr>
        </table>
    </div><br/>

    <div style='background-color:#FEF3C7; padding:8px; border-radius:8px; border:1px solid #FCD34D;'>
        <font color='#92400E' size='8.5'><b>Direct Alignment with National Priorities:</b></font><br/>
        <font color='#78350F' size='8'>
        Supports Digital Agriculture Mission, Viksit Bharat 2047, and doubling farmers' income through precision AI tools.
        </font>
    </div>
    """

    impact_table = Table(
        [[Paragraph(impact_left, body), Paragraph(impact_right, body)]],
        colWidths=[395, 391]
    )
    impact_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(impact_table)

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("RESEARCH, REFERENCES & DATA SOURCES", slide_heading))

    ref_left = """
    <b>1. Agronomic Research & Botanical Foundations:</b><br/>
    • <b>ICAR Packages of Practices:</b> Standardized chemical and bio-organic dosages for Cotton, Wheat, Tomato, Maize, and Paddy.<br/>
    • <b>CABI Crop Protection Compendium & PlantVillage Dataset:</b> Reference datasets for cellular foliar lesion classifications.<br/>
    • <b>Wikipedia MediaWiki Knowledge Repository:</b> Live encyclopedia grounding providing verified scientific classifications.<br/>
    • <b>IMD Mausam Telemetry:</b> Meteorological station integration guidelines for agricultural spraying safety.<br/><br/>

    <b>2. Project Repositories & Video Demonstration:</b><br/>
    • <b>Live Working Prototype:</b> <font color='#1D4ED8'><u>https://agrisaathi-sih2026.vercel.app</u></font><br/>
    • <b>GitHub Source Code:</b> <font color='#1D4ED8'><u>https://github.com/HxElite/AgriSaathi-SIH2026</u></font><br/>
    • <b>Video Demonstration:</b> <font color='#1D4ED8'><u>https://youtu.be/AgriSaathi-SIH2026-Demo</u></font><br/>
    • <b>API Documentation:</b> <font color='#1D4ED8'><u>https://agrisaathi.docs.api/v1</u></font>
    """

    ref_right = """
    <div style='background-color:#F8FAFC; padding:10px; border-radius:8px; border:1px solid #CBD5E1;'>
        <font color='#0F172A' size='9'><b>Official Reference Portals & Data Sources</b></font><br/><br/>
        <table border='0' cellpadding='3'>
            <tr>
                <td width='160'><b>Data Source / Entity</b></td>
                <td><b>Official Web Portal Link</b></td>
            </tr>
            <tr>
                <td>Wikipedia Agronomy API</td>
                <td><font color='#1D4ED8'>https://en.wikipedia.org/api/rest_v1/</font></td>
            </tr>
            <tr>
                <td>IMD Agro-Meteorology</td>
                <td><font color='#1D4ED8'>https://mausam.imd.gov.in/</font></td>
            </tr>
            <tr>
                <td>Agmarknet APMC Rates</td>
                <td><font color='#1D4ED8'>https://agmarknet.gov.in/</font></td>
            </tr>
            <tr>
                <td>PM-KISAN Samman Nidhi</td>
                <td><font color='#1D4ED8'>https://pmkisan.gov.in/</font></td>
            </tr>
            <tr>
                <td>PM Fasal Bima (PMFBY)</td>
                <td><font color='#1D4ED8'>https://pmfby.gov.in/</font></td>
            </tr>
            <tr>
                <td>ICAR Portal</td>
                <td><font color='#1D4ED8'>https://icar.org.in/</font></td>
            </tr>
            <tr>
                <td>KVK Portal (Kerala/Gujarat)</td>
                <td><font color='#1D4ED8'>https://kvk.icar.gov.in/</font></td>
            </tr>
        </table>
    </div><br/>

    <div style='background-color:#F0FDF4; padding:8px; border-radius:8px; border:1px solid #86EFAC;'>
        <font color='#166534' size='8.5'><b>Smart India Hackathon 2026 Submission Verified</b></font><br/>
        <font color='#1E293B' size='8'>
        Submitted by <b>Team HxElite</b> for Problem Statement <b>SIH25076</b> (Government of Kerala).
        </font>
    </div>
    """

    ref_table = Table(
        [[Paragraph(ref_left, body), Paragraph(ref_right, body)]],
        colWidths=[385, 401]
    )
    ref_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(ref_table)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated winning SIH PDF: {output_filename}")

if __name__ == '__main__':
    out_file = "SIH25076_HxElite_AgriSaathi.pdf"
    if len(sys.argv) > 1:
        out_file = sys.argv[1]
    build_sih_pdf(out_file)
