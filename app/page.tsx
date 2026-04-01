"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/context/themeContext" // Assuming useTheme is imported from a custom context

export default function Portfolio() {
  const { isDark, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("intro")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    // Animation observer — fires fade-in-up when any part of a section enters the viewport
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0 },
    )

    // Active-section observer — uses a narrow horizontal band in the middle of the
    // viewport so that even very tall sections (like Work Experience) register
    // correctly as soon as their top edge crosses into that band.
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: "-40% 0px -55% 0px",
      },
    )

    sectionsRef.current.forEach((section) => {
      if (section) {
        animationObserver.observe(section)
        activeObserver.observe(section)
      }
    })

    return () => {
      animationObserver.disconnect()
      activeObserver.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex items-center justify-center w-full">
              <div className="flex items-center gap-1 text-sm">
                {[
                  { id: "intro", label: "Home" },
                  { id: "work", label: "Work Experience" },
                  { id: "projects", label: "My Projects" },
                  { id: "connect", label: "Let's Connect" },
                ].map((item, index) => (
                  <div key={item.id} className="flex items-center">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-3 py-2 rounded transition-colors duration-300 ${activeSection === item.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      )}
                    </button>
                    {index < 3 && <span className="text-muted-foreground/50 mx-1">|</span>}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-auto p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-2">
                {[
                  { id: "intro", label: "Home" },
                  { id: "work", label: "Work Experience" },
                  { id: "projects", label: "My Projects" },
                  { id: "connect", label: "Let's Connect" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-left rounded transition-colors duration-300 ${activeSection === item.id
                      ? "text-foreground font-medium bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section
                ? "bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-500 shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <header id="intro" ref={(el) => (sectionsRef.current[0] = el)} className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / Edition 2026</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Ignacio Julián
                  <br />
                  <span className="text-muted-foreground">Castro Centeno</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Software Architect with more than 8 years of experience interested in
                  <span className="text-foreground"> Web Development</span>,
                  <span className="text-foreground"> Cybersecurity</span>, and
                  <span className="text-foreground"> Technology</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Ciudad Autónoma de Buenos Aires, Argentina</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">LAST PROFESSIONAL EXPERIENCE</div>
                <div className="space-y-2">
                  <div className="text-foreground">SR Software Engineer</div>
                  <div className="text-muted-foreground">@ Interinnova</div>
                  <div className="text-xs text-muted-foreground">January 2026</div>
                </div>
              </div>

              <div className="space-y-4 mt-16">
                <div className="text-sm text-muted-foreground font-mono">TECH STACK</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "HTML5",
                    "CSS3",
                    "Bootstrap",
                    "Bulma CSS",
                    "Chakra UI",
                    "Lit Element",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Angular",
                    "Node.js",
                    "Express",
                    "Java",
                    "Python",
                    "Kotlin",
                    "Spring Framework",
                    "Flask",
                    "Django",
                    "MySQL",
                    "PostgreSQL",
                    "MongoDB",
                    "Bash",
                    "Linux",
                    "Git",
                    "GitHub",
                    "GitLab",
                    "CI/CD Pipelines",
                    "AI / ML",
                    "Scrum / Kanban",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen pt-32 pb-20 sm:pt-40 sm:pb-32"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
              <div className="text-lg text-muted-foreground font-mono">2018 - 2026</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "Jan 2026",
                  role: "Senior Software Engineer",
                  company: "Interinnova (Argentina)",
                  description: `Working both on greenfield and brownfield initiatives within the organization with the aim to improve the robustness of the information systems, making them more legible, maintainable and scalable through time, following the most reknown good practices and methodologies for the design and development of software application. Maintained and reinforced system design and architectures to make the codebase more meaningful and clear. Submitted the formal proposal, in company of others, to implement an Enterprise Service Bus (ESB), in order to improve the connection, routing and data protection of information circulating between the multiple client implementations with their corresponding producers counterparts, considering different ad-hoc API architectures like SOAP, REST, GraphQL and gRPC, to best fulfill the functional requirement needs expressed by the business logic of the organization. Shared knowledge and provided mentorship to help and support other less-experienced engineers in the working cell.`,
                  tech: [
                    "Java",
                    "Spring Framework",
                    "Hibernate",
                    "JSP & Servlets",
                    "Systems Architecture",
                    "Clean Architecture",
                    "DDD",
                    "Microservices",
                  ],
                },
                {
                  year: "Oct 2025",
                  role: "Technical Lead",
                  company: "FixRiver LLC (United States)",
                  description: `Fixed-term contract for 2 months to fulfill the role of Tech Lead at the startup company to finish different already initiated Full-Stack Web Development projects implemented in Java, and to be delivered to their corresponding clients at the earliest opportunity. Led the design, development, and maintenance of diverse software projects, spanning Greenfield initiatives (custom solutions built from scratch) and Brownfield projects (enhancements, refactoring, and long-term support) for international and domestic clients. Delivered solutions with Java and the Spring ecosystem, implementing APIs with different architectures, usage of relational and non-relational databases for design and management, and implementing clean software architectures to ensure scalability and high performance for a long-term compromise. Establishing SLAs/SLOs for Back-End services and applying regular or AI-based automation to improve delivery efficiency and accuracy. Working with cross-functional stakeholders to align engineering solutions with business objectives, implementing agile methodologies like Scrum or Kanban. Tackling challenging technical problems, enhancing scalability, performance, reliability, and resilience issues.`,
                  tech: [
                    "Java SE",
                    "Java EE",
                    "Spring Framework",
                    "Hibernate",
                    "JPA",
                    "JSP & Servlets",
                    "Systems Architecture",
                    "React.js",
                    "Microservices",
                  ],
                },
                {
                  year: "2022 - Present",
                  role: "Software Engineer",
                  company: "Freelancer / Contractor",
                  description: `Working as an independent Java remotely, I used to design, build, and deploy new Full-Stack applications, new microservices, modules and features, both for legacy and new web and desktop development projects, using the Spring Framework and the most recent and innovative related tools. Rapid release cycles. Implementation of design patterns, data structures, and concurrency. Executed Java application migrations from legacy versions to modern standards for both web and desktop environments, ensuring compatibility, performance optimization, and modernization of existing enterprise solutions. Applied Agile methodologies across the full Software Development Lifecycle (SDLC), incorporating unit/integration testing, CI/CD with GitHub Actions, and cross-functional collaboration with Jira, Confluence, Trello, Slack. Delivering end-to-end full-stack solutions in distributed, cross-cultural contexts.`,
                  tech: [
                    "Java",
                    "MERN",
                    "SOAP APIs",
                    "REST APIs",
                    "Clean Code",
                    "Microservices",
                    "MySQL",
                    "AWS",
                    "Design Patterns",
                  ],
                },
                {
                  year: "May 2025 - Aug 2025",
                  role: "SAP ABAP Developer",
                  company: "Expassio S.R.L (Argentina)",
                  description: `Results-driven SAP ABAP Developer with hands-on experience in on-premises (SAP ECC, SAP R/3) and cloud (S/4HANA, SAP BTP) environments. Skilled in designing, developing, and implementing end-to-end solutions using ABAP, RAP, CAP, WebDynpro, and OData Services, as well as building advanced reporting tools with ALV Reports, CDS Views, and SAP BW. Designed SAP FIORI/UI5 applications with HTML5, CSS3, and JavaScript, ensuring responsive and user-friendly interfaces. Experienced in customizing business documents with Adobe Forms, Smart Forms, and SAP Scripts, enabling seamless front-end and back-end integration while adhering to best development practices stated by SAP.`,
                  tech: ["SAP", "ABAP", "UI5", "R/3", "FIORI", "S4/HANA", "Oracle", "Netweaver", "Dynpros"],
                },
                {
                  year: "Nov 2023 - Jan 2025",
                  role: "SAP ARIBA Consultant",
                  company: "SNP Group (Germany)",
                  description: `Providing consulting services to large enterprises established in the global market, solving critical issues to the production processes chain of each company, trying to improve both efficiency and spending on existing or newer SAP systems. Modules that I have worked on as an SAP ARIBA Consultant: Sourcing, Contracts, SPM, SLP, Ariba Network and Buying.`,
                  tech: [
                    "SAP ERP",
                    "SAP ARIBA",
                    "Sourcing",
                    "Contracts",
                    "SLP",
                    "Commerce",
                    "Buying",
                    "Ariba Network",
                    "Classic & Guided UIs",
                  ],
                },
                {
                  year: "Mar 2023 - Apr 2023",
                  role: "Cybersecurity Intern",
                  company: "KPMG (Argentina)",
                  description: `Topics covered during the internship: Cybersecurity Governance & Strategy, Industrial Cybersecurity, Information Technologies (IT), Operations Technologies (OT), DevOps & DevSecOps, Cloud Security, Active Directory, Ethical Hacking, Red, Blue & Purple Teaming, SOC Incident & Response, CSIRT, Vulnerability Assessment, ISO 27001, NIST Framework, COBIT5, MITRE Att&ck, OSI vs. Purdue models.`,
                  tech: [
                    "IT",
                    "OT",
                    "Cybersecurity Governance",
                    "DevOps",
                    "DevSecOps",
                    "Cloud Security",
                    "ISO 27001",
                    "NIST Framework",
                    "Mitre ATT&CK",
                    "COBIT 5",
                    "Ethical Hacking",
                    "SOC",
                  ],
                },
                {
                  year: "Nov 2022 - Feb 2023",
                  role: "Full-Stack Developer",
                  company: "Tangol Tours S.R.L (Argentina)",
                  description: `Development, maintenance and improvements for the official travel agency s website. Administration and maintenance of hosting servers and cloud services hired. Generation of technical and non-technical reports to different corporate team members and leaders.`,
                  tech: [
                    "C#",
                    ".NET Core",
                    "ASP.NET",
                    "Entity Framework",
                    "LINQ",
                    "SQL SERVER",
                    "Visual Studio",
                    "NuGet",
                    "MVC",
                    "Razor",
                    "Angular",
                  ],
                },
                {
                  year: "Apr 2018 - Aug 2022",
                  role: "IT Technical Support",
                  company: "Independent Professional (Argentina)",
                  description: `4 years of experience providing comprehensive technical support to users in both corporate and individual environments. Skilled in diagnosing and repairing PCs and laptops, installing and configuring operating systems (Windows, Linux, Android), and performing preventive and corrective hardware maintenance. Strong knowledge of computer networks, including router and switch configuration, structured cabling, and resource sharing. Customer-focused, with excellent communication skills, teamwork abilities, and a proactive approach to solving technical issues efficiently.`,
                  tech: [
                    "Windows",
                    "Linux",
                    "Hardware",
                    "Software",
                    "Mobile Devices",
                    "Networking",
                    "Internet",
                    "Consultancy",
                    "Badgeting",
                    "IP Phone Setup & Config",
                  ],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-4 pr-12">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500 whitespace-nowrap">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 mt-2 lg:mt-0">
                    <div className="grid grid-cols-3 gap-2">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1.5 text-[11px] flex items-center justify-center text-muted-foreground border border-border rounded-2xl group-hover:border-muted-foreground/50 transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-12 mt-4">
                    <p className="text-muted-foreground leading-relaxed text-pretty">{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" ref={(el) => (sectionsRef.current[2] = el)} className="min-h-screen py-20 sm:py-32">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">My Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "HR Management System",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project1",
                  image:
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
                {
                  name: "Inventory App",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project2",
                  image: "/inventory-app.jpg",
                },
                {
                  name: "Bank Accounts Module",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project3",
                  image: "/bank-account-module.jpg",
                },
                {
                  name: "Bookstore Desktop App",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project4",
                  image: "/hr-management-system.jpg",
                },
                {
                  name: "Todo List App",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project5",
                  image: "/todo-list-app.jpg",
                },
                {
                  name: "School Management System (CLI)",
                  description: "lorem",
                  url: "https://github.com/ignaciocastrocenteno/project6",
                  image: "/school-management-system-cli.jpg",
                },
              ].map((project, index) => (
                <Link
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-card space-y-2">
                    <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology, design &
                  development.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:ignaciocastrocenteno@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">ignaciocastrocenteno@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@ignaciocastrocenteno", url: "https://github.com/ignaciocastrocenteno" },
                  { name: "v0.dev", handle: "@ignaciocastrocenteno", url: "https://v0.app/@ignaciocastrocenteno" },
                  {
                    name: "LinkedIn",
                    handle: "Ignacio Castro Centeno",
                    url: "https://www.linkedin.com/in/ignacio-castro-centeno/",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 pr-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Ignacio Castro Centeno. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
