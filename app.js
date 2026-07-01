/* Vantage HR — Monalisa Tech Solutions
   app.js — all application logic */

(async function(){

/* ===================================================================== DATA */

const TENANTS = {
  krh: {
    key:'krh', shortName:'Kampala Ridge Hospital', mark:'KR',
    accent:'#1F6F5C', accentStrong:'#154A3D', accentSoft:'#E2EFEA', defaultAccent:'#1F6F5C',
    domain:'kampalaridgehospital.org', plan:'Growth plan',
    industry:'Healthcare', location:'Nakasero, Kampala', contactPhone:'+256 703 221 408',
    currentUser:{ name:'Patricia Nantongo', role:'HR Manager' },
    members:[
      { name:'Patricia Nantongo', role:'Owner', status:'Active' },
      { name:'Allan Mugisha', role:'Admin', status:'Active' },
      { name:'Moses Okello', role:'Member', status:'Active' }
    ],
    departments:['Clinical Services','Nursing','Radiology','Laboratory','Pharmacy','Administration','Finance','Facilities','IT Support'],
    openRequisitions:3, reviewsThisMonth:5, currentCycle:'Q2 2026',
    currency:'UGX', currencySymbol:'UGX ',
    leavePolicy:{ annual:21, sick:10, compassionate:4, maternity:60, carryover:5, noticeDays:3, blackout:['2026-12-24','2026-12-31'] },
    managerOf:{ 'KRH-0042':null, 'KRH-0021':'KRH-0042', 'KRH-0101':'KRH-0021', 'KRH-0088':'KRH-0101', 'KRH-0142':'KRH-0088', 'KRH-0119':'KRH-0021', 'KRH-0201':'KRH-0088', 'KRH-0133':'KRH-0021', 'KRH-0096':'KRH-0021', 'KRH-0117':'KRH-0042', 'KRH-0015':'KRH-0021', 'KRH-0167':'KRH-0088', 'KRH-0149':'KRH-0021', 'KRH-0204':'KRH-0042' },
    savedReports:[],
    shifts:{},
    benefits:[
      {id:'BEN-K1', name:'Staff medical insurance', category:'Health', emoji:'🏥', value:250000, desc:'Inpatient and outpatient cover at Kampala Ridge Hospital and partner clinics', active:true},
      {id:'BEN-K2', name:'NSSF pension', category:'Retirement', emoji:'🏦', value:0, desc:'Mandatory employer contribution (10%) and employee contribution (5%)', active:true},
      {id:'BEN-K3', name:'Staff transport allowance', category:'Transport', emoji:'🚌', value:120000, desc:'Monthly transport supplement for all permanent staff', active:true},
      {id:'BEN-K4', name:'Study sponsorship', category:'Education', emoji:'🎓', value:500000, desc:'Part-time study reimbursement for health-related qualifications', active:false}
    ],
    expenses:[
      {id:'EXP-K1', employeeId:'KRH-0101', category:'Travel', desc:'Conference in Nairobi — transport and accommodation', amount:1200000, date:'2026-06-10', status:'Pending'},
      {id:'EXP-K2', employeeId:'KRH-0042', category:'Training', desc:'HR systems workshop registration fee', amount:350000, date:'2026-06-12', status:'Approved'},
      {id:'EXP-K3', employeeId:'KRH-0133', category:'Equipment', desc:'Pharmacy label printer cartridges', amount:180000, date:'2026-06-08', status:'Approved'},
      {id:'EXP-K4', employeeId:'KRH-0096', category:'Meals', desc:'Finance team working lunch', amount:95000, date:'2026-06-14', status:'Pending'},
      {id:'EXP-K5', employeeId:'KRH-0149', category:'Communication', desc:'Mobile data bundles — IT department', amount:75000, date:'2026-06-11', status:'Rejected'}
    ],
    assets:[
      {id:'AST-K1', name:'Dell Latitude 5540', category:'Computer', serial:'DL-2024-001', assignedTo:'KRH-0042', status:'In use', value:2800000, purchaseDate:'2024-03-15'},
      {id:'AST-K2', name:'HP LaserJet Pro', category:'Computer', serial:'HP-2023-014', assignedTo:'KRH-0042', status:'In use', value:950000, purchaseDate:'2023-11-02'},
      {id:'AST-K3', name:'Toyota Hiace ambulance', category:'Vehicle', serial:'UAF-234A', assignedTo:'', status:'In use', value:85000000, purchaseDate:'2022-06-01'},
      {id:'AST-K4', name:'ECG Monitor — Philips', category:'Medical equipment', serial:'ECG-PHI-007', assignedTo:'KRH-0101', status:'In use', value:12000000, purchaseDate:'2023-01-20'},
      {id:'AST-K5', name:'Standing desk', category:'Furniture', serial:'FRN-2024-003', assignedTo:'KRH-0096', status:'In use', value:450000, purchaseDate:'2024-02-10'},
      {id:'AST-K6', name:'Lenovo ThinkPad X1', category:'Computer', serial:'LN-2023-008', assignedTo:'', status:'Available', value:3200000, purchaseDate:'2023-09-05'},
      {id:'AST-K7', name:'Autoclave steriliser', category:'Medical equipment', serial:'AUTO-2021-002', assignedTo:'', status:'Maintenance', value:8500000, purchaseDate:'2021-04-18'}
    ],
    courses:[
      {id:'CRS-K1', title:'Infection prevention & control', category:'Safety', emoji:'🦠', durationHrs:3, mandatory:true, deadline:'2026-07-31', completions:{}},
      {id:'CRS-K2', title:'Patient data privacy', category:'Compliance', emoji:'🔒', durationHrs:2, mandatory:true, deadline:'2026-08-15', completions:{}},
      {id:'CRS-K3', title:'Leadership essentials', category:'Leadership', emoji:'🎯', durationHrs:8, mandatory:false, deadline:'2026-09-30', completions:{}},
      {id:'CRS-K4', title:'Mental health first aid', category:'Wellbeing', emoji:'🧠', durationHrs:4, mandatory:false, deadline:'2026-10-31', completions:{}}
    ],
    surveys:[
      {id:'SRV-K1', title:'Q2 Staff pulse check', type:'Pulse check', deadline:'2026-06-30', anonymous:true, responses:9, total:14, score:74},
      {id:'SRV-K2', title:'Manager effectiveness', type:'Manager feedback', deadline:'2026-07-15', anonymous:true, responses:3, total:14, score:null}
    ],
    pulseTrend:[62, 67, 70, 68, 72, 74],
    recognition:[
      {id:'REC-K1', from:'KRH-0042', to:'KRH-0088', value:'🌟 Excellence', message:"Esther's dedication during the night shift shortage kept patient care standards high.", when:'2 days ago'},
      {id:'REC-K2', from:'KRH-0021', to:'KRH-0149', value:'💡 Innovation', message:'Robert built an IT ticketing system that cut resolution times by 40%.', when:'1 week ago'}
    ],
    enrolments:{},
    tickets:[
      {id:'TKT-K1', employeeId:'KRH-0149', category:'IT Support', subject:'Printer not connecting in Radiology', desc:'The shared printer in the Radiology department keeps disconnecting from the network.', priority:'Medium', status:'Open', created:'2026-06-18'},
      {id:'TKT-K2', employeeId:'KRH-0117', category:'HR Query', subject:'Question about maternity leave policy', desc:'Need clarification on how maternity leave interacts with annual leave carry-over.', priority:'Low', status:'In progress', created:'2026-06-15'},
      {id:'TKT-K3', employeeId:'KRH-0201', category:'Access & Permissions', subject:'Need access to lab results system', desc:'New lab technician needs login credentials for the results database.', priority:'High', status:'Open', created:'2026-06-19'},
      {id:'TKT-K4', employeeId:'KRH-0096', category:'Payroll', subject:'Incorrect NSSF deduction last month', desc:'My May payslip shows a higher NSSF deduction than expected.', priority:'Urgent', status:'Resolved', created:'2026-06-02'}
    ],
    announcements:[
      {id:'ANN-K1', title:'New patient records system goes live 1 July', category:'Policy update', body:'Starting 1 July, all departments will transition to the new digital patient records system. Training sessions are scheduled throughout June. Please see your department head for your session time.', pinned:true, author:'Patricia Nantongo', when:'2 days ago'},
      {id:'ANN-K2', title:'Congratulations to our Q2 award winners', category:'Celebration', body:'Please join us in congratulating Joseph Byaruhanga and Brenda Kyomuhendo for outstanding contributions this quarter. A small celebration will be held in the main hall this Friday at 4pm.', pinned:false, author:'Allan Mugisha', when:'5 days ago'},
      {id:'ANN-K3', title:'Updated fire safety procedures', category:'Urgent', body:'Following the recent facilities review, updated fire evacuation procedures are now posted on all floors. Please familiarise yourself with your nearest exit and assembly point.', pinned:false, author:'Vincent Ssempa', when:'1 week ago'}
    ],
    travelRequests:[
      {id:'TRV-K1', employeeId:'KRH-0101', destination:'Nairobi, Kenya', purpose:'East Africa Medical Conference', departDate:'2026-07-12', returnDate:'2026-07-16', cost:3200000, status:'Pending'},
      {id:'TRV-K2', employeeId:'KRH-0042', destination:'Entebbe, Uganda', purpose:'HR systems vendor meeting', departDate:'2026-06-25', returnDate:'2026-06-25', cost:280000, status:'Approved'},
      {id:'TRV-K3', employeeId:'KRH-0133', destination:'Kigali, Rwanda', purpose:'Pharmaceutical supply chain summit', departDate:'2026-08-03', returnDate:'2026-08-06', cost:2100000, status:'Pending'}
    ],
    onboardingPlans:[
      {id:'OB-K1', employeeId:'KRH-0204', buddyId:'KRH-0042', startDate:'2026-06-15', checklist:{ 'Sign contract & HR paperwork':true, 'IT account & equipment setup':true, 'Department orientation':true, 'Meet your buddy':true, 'Complete mandatory training':false, 'First week check-in':false, '30-day review scheduled':false }},
      {id:'OB-K2', employeeId:'KRH-0201', buddyId:'KRH-0133', startDate:'2026-04-06', checklist:{ 'Sign contract & HR paperwork':true, 'IT account & equipment setup':true, 'Department orientation':true, 'Meet your buddy':true, 'Complete mandatory training':true, 'First week check-in':true, '30-day review scheduled':true }}
    ],
    knowledgeArticles:[
      {id:'KB-K1', title:'Annual leave policy', category:'HR Policies', content:'All permanent staff accrue 21 days of annual leave per calendar year. Leave must be requested at least 3 days in advance through the Leave & Attendance module. Up to 5 unused days may be carried over into the following year.', author:'Patricia Nantongo', updated:'2026-05-10'},
      {id:'KB-K2', title:'How to request IT equipment', category:'IT & Systems', content:'Submit a Service Desk ticket under the IT Support category with your equipment request. Standard requests are fulfilled within 3 business days. Urgent requests should be marked High priority and will be reviewed same-day.', author:'Robert Wanyama', updated:'2026-04-22'},
      {id:'KB-K3', title:'Patient confidentiality code of conduct', category:'Code of Conduct', content:'All staff handling patient information must complete the Patient Data Privacy course within 30 days of joining. Breaches of confidentiality are treated as serious misconduct and may result in disciplinary action up to and including termination.', author:'Allan Mugisha', updated:'2026-03-15'},
      {id:'KB-K4', title:'Medical insurance claim process', category:'Benefits', content:'Staff medical insurance covers inpatient and outpatient care at Kampala Ridge Hospital and partner clinics. To claim, present your staff ID at the point of service — claims are processed automatically with no paperwork required for in-network care.', author:'Patricia Nantongo', updated:'2026-02-28'}
    ],
    hireTrend:[1,0,2,1,2,3],
    successionPlan:[
      {id:'SUC-K1', role:'Head of Nursing', incumbentId:'KRH-0021', candidateId:'KRH-0088', readiness:'ready', notes:'Martha has completed the leadership essentials programme and is operating at senior level already.'},
      {id:'SUC-K2', role:'Chief Pharmacist', incumbentId:'KRH-0133', candidateId:'KRH-0149', readiness:'soon', notes:'Robert needs 18 months in a deputy role plus the clinical management certification.'},
      {id:'SUC-K3', role:'IT Manager', incumbentId:'KRH-0117', candidateId:'KRH-0204', readiness:'dev', notes:'Hellen is promising but needs 2–3 years of system administration experience and a formal IT qualification.'}
    ],
    workforcePlan:[
      {dept:'Clinical Services', current:4, planned:5, budget:18000000},
      {dept:'Nursing', current:3, planned:4, budget:12000000},
      {dept:'Pharmacy', current:2, planned:2, budget:6400000},
      {dept:'Administration', current:2, planned:3, budget:6000000},
      {dept:'IT Support', current:1, planned:2, budget:3800000}
    ],
    meritCycle:{ label:'FY 2026–27 Merit Cycle', status:'Open', proposals:[
      {employeeId:'KRH-0088', currentSalary:4200000, proposedIncreasePct:8, justification:'Exceptional performance, leading ward during shortage periods.', status:'Pending'},
      {employeeId:'KRH-0101', currentSalary:5500000, proposedIncreasePct:5, justification:'Consistent delivery, strong patient satisfaction scores.', status:'Approved'},
      {employeeId:'KRH-0149', currentSalary:2800000, proposedIncreasePct:10, justification:'Took on additional IT responsibilities, zero system downtime.', status:'Pending'}
    ]},
    salaryBands:[
      {grade:'Grade A – Senior Clinical', deptTag:'Clinical Services', minSalary:4000000, midSalary:5500000, maxSalary:7000000},
      {grade:'Grade B – Clinical / Nursing', deptTag:'Nursing', minSalary:2500000, midSalary:3500000, maxSalary:4500000},
      {grade:'Grade C – Technical / Support', deptTag:'Pharmacy', minSalary:1800000, midSalary:2500000, maxSalary:3200000},
      {grade:'Grade D – Administrative', deptTag:'Administration', minSalary:1200000, midSalary:1700000, maxSalary:2200000}
    ],
    signatureRequests:[
      {id:'SIG-K1', docName:'Employment contract — Hellen Auma', docType:'Employment contract', signeeId:'KRH-0204', requestedDate:'2026-06-15', deadline:'2026-06-22', status:'Signed', signedDate:'2026-06-18'},
      {id:'SIG-K2', docName:'Offer letter — Pharmacy Technician', docType:'Offer letter', signeeId:'KRH-0149', requestedDate:'2026-06-19', deadline:'2026-06-26', status:'Pending', signedDate:null},
      {id:'SIG-K3', docName:'Updated staff handbook acknowledgement', docType:'Policy acknowledgement', signeeId:'KRH-0042', requestedDate:'2026-06-10', deadline:'2026-06-17', status:'Signed', signedDate:'2026-06-14'},
      {id:'SIG-K4', docName:'Probation extension letter — IT Support', docType:'Amendment', signeeId:'KRH-0117', requestedDate:'2026-06-18', deadline:'2026-06-25', status:'Pending', signedDate:null}
    ],
    leaveRequests:[
      {id:'LR-K1', employeeId:'KRH-0142', type:'Sick', startDate:'2026-06-17', endDate:'2026-06-19', status:'Approved'},
      {id:'LR-K2', employeeId:'KRH-0117', type:'Annual', startDate:'2026-06-16', endDate:'2026-06-21', status:'Approved'},
      {id:'LR-K3', employeeId:'KRH-0167', type:'Annual', startDate:'2026-07-01', endDate:'2026-07-03', status:'Pending'},
      {id:'LR-K4', employeeId:'KRH-0015', type:'Compassionate', startDate:'2026-06-20', endDate:'2026-06-20', status:'Pending'}
    ],
    avgTimeToHireDays:24,
    nextPayDate:'2026-06-28', lastPayDate:'2026-05-28', payRunStatus:'Scheduled',
    goals:[
      {id:'GL-K1', title:'Reduce average Outpatient wait time', department:'Clinical Services', progress:72, status:'On track', dueDate:'2026-09-30'},
      {id:'GL-K2', title:'Complete annual fire safety recertification', department:'Facilities', progress:40, status:'At risk', dueDate:'2026-07-15'},
      {id:'GL-K3', title:'Launch digital patient records pilot', department:'IT Support', progress:85, status:'On track', dueDate:'2026-08-01'},
      {id:'GL-K4', title:'Cut pharmacy stock-out incidents in half', department:'Pharmacy', progress:100, status:'Completed', dueDate:'2026-06-01'}
    ],
    team:[
      {employeeId:'KRH-0042', role:'Owner'},
      {employeeId:'KRH-0021', role:'Admin'},
      {employeeId:'KRH-0096', role:'Billing admin'}
    ],
    invites:[],
    billing:{ priceUGX:580000, seatsLimit:10, storageUsedGB:22, storageLimitGB:50, nextBillingDate:'2026-07-01' },
    security:{ mfaRequired:true, ssoEnabled:false, ipRestricted:false },
    auditLog:[
      {text:'Patricia Nantongo signed in from Kampala, Uganda', when:'Today, 7:52 AM'},
      {text:'Password policy updated to require 12 characters', when:'3 days ago'},
      {text:'Allan Mugisha added as workspace admin', when:'2 weeks ago'}
    ],
    openings:[
      {id:'OP-K1', title:'Theatre Nurse', department:'Nursing', location:'Main Campus', applicants:9, status:'Open', postedDate:'2026-05-20'},
      {id:'OP-K2', title:'Pharmacy Technician', department:'Pharmacy', location:'Main Campus', applicants:5, status:'Open', postedDate:'2026-05-28'},
      {id:'OP-K3', title:'Biomedical Engineer', department:'Facilities', location:'Main Campus', applicants:3, status:'On hold', postedDate:'2026-04-15'}
    ],
    candidates:[
      {id:'CD-K1', name:'Patience Nansamba', role:'Theatre Nurse', stage:'Interview', appliedDate:'2026-06-02'},
      {id:'CD-K2', name:'Moses Ddamba', role:'Theatre Nurse', stage:'Screening', appliedDate:'2026-06-08'},
      {id:'CD-K3', name:'Ritah Namuli', role:'Theatre Nurse', stage:'Applied', appliedDate:'2026-06-15'},
      {id:'CD-K4', name:'Brian Kasozi', role:'Pharmacy Technician', stage:'Offer', appliedDate:'2026-05-30'},
      {id:'CD-K5', name:'Catherine Nansubuga', role:'Pharmacy Technician', stage:'Applied', appliedDate:'2026-06-12'},
      {id:'CD-K6', name:'Stephen Mukiibi', role:'Biomedical Engineer', stage:'Screening', appliedDate:'2026-05-25'},
      {id:'CD-K7', name:'Olivia Kobusingye', role:'Theatre Nurse', stage:'Applied', appliedDate:'2026-05-22'},
      {id:'CD-K8', name:'Derrick Ssegawa', role:'Pharmacy Technician', stage:'Hired', appliedDate:'2026-04-20'}
    ],
    employees:[
      {name:'Dr. Samuel Mukasa', title:'Consultant Physician', department:'Clinical Services', status:'Active', hireDate:'2018-03-12', id:'KRH-0101', salary:6500000},
      {name:'Esther Nakato', title:'Senior Nurse', department:'Nursing', status:'Active', hireDate:'2016-07-01', id:'KRH-0088', salary:2100000},
      {name:'Grace Atim', title:'Staff Nurse', department:'Nursing', status:'On leave', hireDate:'2021-01-18', id:'KRH-0142', salary:1450000},
      {name:'Joseph Byaruhanga', title:'Radiographer', department:'Radiology', status:'Active', hireDate:'2019-09-23', id:'KRH-0119', salary:1800000},
      {name:'Florence Namutebi', title:'Lab Technician', department:'Laboratory', status:'Probation', hireDate:'2026-04-06', id:'KRH-0201', salary:1350000},
      {name:'Patricia Nantongo', title:'HR Manager', department:'Administration', status:'Active', hireDate:'2015-02-09', id:'KRH-0042', salary:3200000},
      {name:'Allan Mugisha', title:'Hospital Administrator', department:'Administration', status:'Active', hireDate:'2014-11-03', id:'KRH-0021', salary:4500000},
      {name:'Brenda Kyomuhendo', title:'Pharmacist', department:'Pharmacy', status:'Active', hireDate:'2020-05-14', id:'KRH-0133', salary:2600000},
      {name:'Moses Okello', title:'Finance Officer', department:'Finance', status:'Active', hireDate:'2017-08-29', id:'KRH-0096', salary:2200000},
      {name:'Sandra Nabirye', title:'Procurement Officer', department:'Administration', status:'On leave', hireDate:'2019-03-11', id:'KRH-0117', salary:1750000},
      {name:'Vincent Ssempa', title:'Facilities Coordinator', department:'Facilities', status:'Active', hireDate:'2013-06-20', id:'KRH-0015', salary:1600000},
      {name:'Diana Kakande', title:'Ward Nurse', department:'Nursing', status:'Active', hireDate:'2022-10-02', id:'KRH-0167', salary:1400000},
      {name:'Robert Wanyama', title:'IT Support Specialist', department:'IT Support', status:'Active', hireDate:'2021-07-19', id:'KRH-0149', salary:1900000},
      {name:'Hellen Auma', title:'Receptionist', department:'Administration', status:'Probation', hireDate:'2026-05-04', id:'KRH-0204', salary:950000}
    ],
    activity:[
      {text:'Grace Atim requested leave for Jul 3–5', when:'Today, 9:14 AM'},
      {text:'Florence Namutebi completed her 90-day check-in', when:'Yesterday'},
      {text:'Performance review cycle for Nursing closes in 6 days', when:'Yesterday'},
      {text:'Hellen Auma starts Monday on the front desk', when:'2 days ago'},
      {text:'Sandra Nabirye requested leave for Jun 24–26', when:'3 days ago'}
    ],
    celebrations:[
      {emoji:'🎉', name:'Joseph Byaruhanga', meta:'7 year work anniversary · Jun 23'},
      {emoji:'🎂', name:'Brenda Kyomuhendo', meta:'Birthday · Jun 27'}
    ]
  },
  nlc: {
    key:'nlc', shortName:'Nile Logistics Co.', mark:'NL',
    accent:'#B5651D', accentStrong:'#8C4C14', accentSoft:'#F7E9DA', defaultAccent:'#B5651D',
    domain:'nilelogistics.co.ug', plan:'Growth plan',
    industry:'Logistics & Transport', location:'Industrial Area, Kampala', contactPhone:'+256 712 884 016',
    currentUser:{ name:'Brian Okello', role:'People Operations Lead' },
    members:[
      { name:'Brian Okello', role:'Owner', status:'Active' },
      { name:'Peter Ssali', role:'Admin', status:'Active' },
      { name:'Sarah Naigaga', role:'Member', status:'Active' }
    ],
    departments:['Fleet Operations','Warehousing','Customer Service','Finance','Human Resources','IT Support','Procurement'],
    openRequisitions:2, reviewsThisMonth:3, currentCycle:'Q2 2026',
    currency:'UGX', currencySymbol:'UGX ',
    leavePolicy:{ annual:18, sick:10, compassionate:3, maternity:60, carryover:3, noticeDays:5, blackout:['2026-12-25'] },
    managerOf:{ 'NLC-0034':null, 'NLC-0019':'NLC-0034', 'NLC-0078':'NLC-0019', 'NLC-0061':'NLC-0019', 'NLC-0039':'NLC-0019', 'NLC-0047':'NLC-0034', 'NLC-0091':'NLC-0047', 'NLC-0028':'NLC-0034', 'NLC-0011':'NLC-0034', 'NLC-0103':'NLC-0034', 'NLC-0096':'NLC-0034' },
    savedReports:[],
    shifts:{},
    benefits:[
      {id:'BEN-N1', name:'Group life insurance', category:'Insurance', emoji:'🛡️', value:180000, desc:'Life cover at 3x annual salary for all permanent staff', active:true},
      {id:'BEN-N2', name:'NSSF pension', category:'Retirement', emoji:'🏦', value:0, desc:'Mandatory employer (10%) and employee (5%) contributions', active:true},
      {id:'BEN-N3', name:'Fuel allowance', category:'Transport', emoji:'⛽', value:200000, desc:'Monthly fuel supplement for field and driving staff', active:true},
      {id:'BEN-N4', name:'Gym membership', category:'Wellness', emoji:'💪', value:80000, desc:'Subsidised corporate gym membership at partner facilities', active:false}
    ],
    expenses:[
      {id:'EXP-N1', employeeId:'NLC-0019', category:'Travel', desc:'Mombasa route coordination trip — accommodation', amount:890000, date:'2026-06-09', status:'Pending'},
      {id:'EXP-N2', employeeId:'NLC-0034', category:'Training', desc:'HR certification course materials', amount:420000, date:'2026-06-05', status:'Approved'},
      {id:'EXP-N3', employeeId:'NLC-0028', category:'Communication', desc:'Client entertainment — quarterly review', amount:310000, date:'2026-06-13', status:'Pending'},
      {id:'EXP-N4', employeeId:'NLC-0011', category:'Equipment', desc:'Financial reporting software licence', amount:650000, date:'2026-06-07', status:'Approved'}
    ],
    assets:[
      {id:'AST-N1', name:'Isuzu FRR truck — Unit 01', category:'Vehicle', serial:'UBB-801Z', assignedTo:'NLC-0061', status:'In use', value:95000000, purchaseDate:'2022-08-10'},
      {id:'AST-N2', name:'Isuzu FRR truck — Unit 02', category:'Vehicle', serial:'UBC-102Z', assignedTo:'', status:'Maintenance', value:95000000, purchaseDate:'2022-08-10'},
      {id:'AST-N3', name:'Forklift — Warehouse A', category:'Tools', serial:'FK-2021-001', assignedTo:'NLC-0047', status:'In use', value:28000000, purchaseDate:'2021-03-15'},
      {id:'AST-N4', name:'HP Desktop workstation', category:'Computer', serial:'HP-WS-009', assignedTo:'NLC-0011', status:'In use', value:1800000, purchaseDate:'2023-06-20'},
      {id:'AST-N5', name:'Barcode scanner set (x3)', category:'Tools', serial:'BC-2024-SET1', assignedTo:'', status:'Available', value:450000, purchaseDate:'2024-01-08'}
    ],
    courses:[
      {id:'CRS-N1', title:'Road safety & defensive driving', category:'Safety', emoji:'🚛', durationHrs:4, mandatory:true, deadline:'2026-07-31', completions:{}},
      {id:'CRS-N2', title:'Dangerous goods handling', category:'Compliance', emoji:'⚠️', durationHrs:3, mandatory:true, deadline:'2026-08-31', completions:{}},
      {id:'CRS-N3', title:'Warehouse management systems', category:'Technical', emoji:'📦', durationHrs:6, mandatory:false, deadline:'2026-09-30', completions:{}},
      {id:'CRS-N4', title:'Customer service excellence', category:'Communication', emoji:'🤝', durationHrs:2, mandatory:false, deadline:'2026-10-15', completions:{}}
    ],
    surveys:[
      {id:'SRV-N1', title:'Driver wellbeing check-in', type:'Wellbeing', deadline:'2026-06-28', anonymous:true, responses:6, total:11, score:68},
      {id:'SRV-N2', title:'Q2 eNPS survey', type:'eNPS', deadline:'2026-07-10', anonymous:true, responses:2, total:11, score:null}
    ],
    pulseTrend:[58, 60, 63, 65, 67, 68],
    recognition:[
      {id:'REC-N1', from:'NLC-0034', to:'NLC-0019', value:'🚀 Going above and beyond', message:'Patrick coordinated three simultaneous Mombasa runs without a single delay — remarkable logistics.', when:'3 days ago'},
      {id:'REC-N2', from:'NLC-0019', to:'NLC-0078', value:'🎯 Results', message:"Irene's dispatch accuracy was 100% last month. The team could not function without her.", when:'2 weeks ago'}
    ],
    enrolments:{},
    tickets:[
      {id:'TKT-N1', employeeId:'NLC-0096', category:'IT Support', subject:'Cannot access dispatch tracking system', desc:'Getting a login error when trying to access the GPS tracking dashboard.', priority:'High', status:'Open', created:'2026-06-18'},
      {id:'TKT-N2', employeeId:'NLC-0103', category:'Onboarding', subject:'Missing onboarding documents', desc:'Have not received the procurement policy handbook mentioned during orientation.', priority:'Low', status:'In progress', created:'2026-06-14'},
      {id:'TKT-N3', employeeId:'NLC-0028', category:'Facilities', subject:'Air conditioning not working in customer service area', desc:'The AC unit in the customer service office has been broken for two days.', priority:'Medium', status:'Open', created:'2026-06-19'}
    ],
    announcements:[
      {id:'ANN-N1', title:'New cross-border permit requirements from August', category:'Policy update', body:'Effective 1 August, all cross-border drivers must carry updated COMESA permits. Fleet Operations will distribute new permits during the last week of July — please ensure your documents are up to date.', pinned:true, author:'Brian Okello', when:'3 days ago'},
      {id:'ANN-N2', title:'Warehouse safety week starts Monday', category:'General', body:'Join us for warehouse safety week with daily briefings and a forklift safety refresher course. Attendance is mandatory for all warehouse staff.', pinned:false, author:'Sarah Naigaga', when:'1 week ago'}
    ],
    travelRequests:[
      {id:'TRV-N1', employeeId:'NLC-0019', destination:'Mombasa, Kenya', purpose:'Port logistics coordination meeting', departDate:'2026-07-01', returnDate:'2026-07-04', cost:1800000, status:'Pending'},
      {id:'TRV-N2', employeeId:'NLC-0034', destination:'Kigali, Rwanda', purpose:'Regional HR conference', departDate:'2026-07-20', returnDate:'2026-07-22', cost:1400000, status:'Approved'}
    ],
    onboardingPlans:[
      {id:'OB-N1', employeeId:'NLC-0103', buddyId:'NLC-0011', startDate:'2026-03-23', checklist:{ 'Sign contract & HR paperwork':true, 'IT account & equipment setup':true, 'Department orientation':true, 'Meet your buddy':true, 'Complete mandatory training':true, 'First week check-in':true, '30-day review scheduled':false }}
    ],
    knowledgeArticles:[
      {id:'KB-N1', title:'Vehicle inspection checklist', category:'Health & Safety', content:'Before every long-haul trip, drivers must complete the pre-trip inspection checklist covering tyres, brakes, lights, and cargo securing. Completed checklists must be submitted to the dispatch supervisor before departure.', author:'Patrick Ouma', updated:'2026-05-02'},
      {id:'KB-N2', title:'Fuel allowance and reimbursement', category:'Benefits', content:'Drivers and field staff receive a monthly fuel allowance of UGX 200,000. Additional fuel costs for approved long-distance trips can be claimed through the Expenses module with receipts attached.', author:'Peter Ssali', updated:'2026-04-18'},
      {id:'KB-N3', title:'Warehouse access procedures', category:'IT & Systems', content:'Warehouse access badges are issued by Facilities upon starting. Lost badges should be reported immediately through a Service Desk ticket under Access & Permissions.', author:'Sarah Naigaga', updated:'2026-03-10'}
    ],
    hireTrend:[0,1,1,2,1,1],
    successionPlan:[
      {id:'SUC-N1', role:'Fleet Operations Manager', incumbentId:'NLC-0034', candidateId:'NLC-0019', readiness:'soon', notes:'Patrick has strong operational instincts but needs formal management training and at least one year in a deputy capacity.'},
      {id:'SUC-N2', role:'Head of Dispatch', incumbentId:'NLC-0047', candidateId:'NLC-0078', readiness:'ready', notes:'Irene runs dispatch with minimal supervision and is ready to step up immediately.'}
    ],
    workforcePlan:[
      {dept:'Fleet Operations', current:4, planned:5, budget:16000000},
      {dept:'Warehouse', current:3, planned:3, budget:9000000},
      {dept:'Finance', current:2, planned:2, budget:6000000},
      {dept:'Customer Service', current:2, planned:3, budget:5500000}
    ],
    meritCycle:{ label:'FY 2026–27 Merit Cycle', status:'Open', proposals:[
      {employeeId:'NLC-0019', currentSalary:3200000, proposedIncreasePct:9, justification:'Consistently exceeded route KPIs, zero incident record for 18 months.', status:'Pending'},
      {employeeId:'NLC-0078', currentSalary:2600000, proposedIncreasePct:7, justification:'Dispatch accuracy 100% Q2, strong team leadership.', status:'Approved'}
    ]},
    salaryBands:[
      {grade:'Grade A – Management', deptTag:'Fleet Operations', minSalary:3000000, midSalary:4200000, maxSalary:5500000},
      {grade:'Grade B – Senior Operational', deptTag:'Warehouse', minSalary:2000000, midSalary:2800000, maxSalary:3600000},
      {grade:'Grade C – Operational', deptTag:'Customer Service', minSalary:1200000, midSalary:1700000, maxSalary:2200000}
    ],
    signatureRequests:[
      {id:'SIG-N1', docName:'Driver contract renewal — Patrick Ouma', docType:'Employment contract', signeeId:'NLC-0019', requestedDate:'2026-06-16', deadline:'2026-06-23', status:'Signed', signedDate:'2026-06-17'},
      {id:'SIG-N2', docName:'NDA — new warehouse client agreement', docType:'NDA', signeeId:'NLC-0034', requestedDate:'2026-06-20', deadline:'2026-06-27', status:'Pending', signedDate:null}
    ],
    leaveRequests:[
      {id:'LR-N1', employeeId:'NLC-0061', type:'Sick', startDate:'2026-06-17', endDate:'2026-06-22', status:'Approved'},
      {id:'LR-N2', employeeId:'NLC-0039', type:'Annual', startDate:'2026-06-16', endDate:'2026-06-23', status:'Approved'},
      {id:'LR-N3', employeeId:'NLC-0028', type:'Annual', startDate:'2026-06-26', endDate:'2026-06-28', status:'Pending'},
      {id:'LR-N4', employeeId:'NLC-0047', type:'Compassionate', startDate:'2026-06-21', endDate:'2026-06-21', status:'Pending'}
    ],
    avgTimeToHireDays:18,
    nextPayDate:'2026-06-30', lastPayDate:'2026-05-30', payRunStatus:'Scheduled',
    goals:[
      {id:'GL-N1', title:'Cut average delivery time by 15%', department:'Fleet Operations', progress:65, status:'On track', dueDate:'2026-09-01'},
      {id:'GL-N2', title:'Roll out new warehouse inventory system', department:'Warehousing', progress:30, status:'At risk', dueDate:'2026-08-15'},
      {id:'GL-N3', title:'Zero border-clearance delays for a full month', department:'Fleet Operations', progress:100, status:'Completed', dueDate:'2026-05-31'},
      {id:'GL-N4', title:'Improve customer complaint resolution time', department:'Customer Service', progress:55, status:'On track', dueDate:'2026-09-30'}
    ],
    team:[
      {employeeId:'NLC-0034', role:'Owner'},
      {employeeId:'NLC-0019', role:'Admin'},
      {employeeId:'NLC-0011', role:'Billing admin'}
    ],
    invites:[],
    billing:{ priceUGX:420000, seatsLimit:8, storageUsedGB:14, storageLimitGB:30, nextBillingDate:'2026-07-03' },
    security:{ mfaRequired:false, ssoEnabled:false, ipRestricted:false },
    auditLog:[
      {text:'Brian Okello signed in from Kampala, Uganda', when:'Today, 7:10 AM'},
      {text:'New device authorized for Peter Ssali', when:'5 days ago'},
      {text:'Patrick Ouma added as workspace admin', when:'3 weeks ago'}
    ],
    openings:[
      {id:'OP-N1', title:'Long-Haul Driver', department:'Fleet Operations', location:'Kampala Depot', applicants:11, status:'Open', postedDate:'2026-05-10'},
      {id:'OP-N2', title:'Warehouse Assistant', department:'Warehousing', location:'Jinja Depot', applicants:6, status:'Open', postedDate:'2026-06-01'}
    ],
    candidates:[
      {id:'CD-N1', name:'Joel Ssemwogerere', role:'Long-Haul Driver', stage:'Interview', appliedDate:'2026-05-28'},
      {id:'CD-N2', name:'Hassan Mubiru', role:'Long-Haul Driver', stage:'Screening', appliedDate:'2026-06-05'},
      {id:'CD-N3', name:'Grace Nabukenya', role:'Long-Haul Driver', stage:'Applied', appliedDate:'2026-06-14'},
      {id:'CD-N4', name:'Allan Tumwine', role:'Warehouse Assistant', stage:'Offer', appliedDate:'2026-05-26'},
      {id:'CD-N5', name:'Phionah Namara', role:'Warehouse Assistant', stage:'Applied', appliedDate:'2026-06-10'},
      {id:'CD-N6', name:'Richard Okoth', role:'Long-Haul Driver', stage:'Applied', appliedDate:'2026-05-20'},
      {id:'CD-N7', name:'Betty Nakalembe', role:'Warehouse Assistant', stage:'Hired', appliedDate:'2026-04-18'}
    ],
    employees:[
      {name:'Brian Okello', title:'People Operations Lead', department:'Human Resources', status:'Active', hireDate:'2017-04-11', id:'NLC-0034', salary:3000000},
      {name:'Patrick Ouma', title:'Fleet Supervisor', department:'Fleet Operations', status:'Active', hireDate:'2015-09-02', id:'NLC-0019', salary:2000000},
      {name:'Irene Nansubuga', title:'Dispatch Coordinator', department:'Fleet Operations', status:'Active', hireDate:'2020-01-27', id:'NLC-0078', salary:1500000},
      {name:'David Kato', title:'Truck Driver', department:'Fleet Operations', status:'On leave', hireDate:'2019-06-15', id:'NLC-0061', salary:1200000},
      {name:'Sarah Naigaga', title:'Warehouse Supervisor', department:'Warehousing', status:'Active', hireDate:'2018-02-08', id:'NLC-0047', salary:1700000},
      {name:'James Mwesigwa', title:'Inventory Officer', department:'Warehousing', status:'Active', hireDate:'2021-11-22', id:'NLC-0091', salary:1300000},
      {name:'Christine Akello', title:'Customer Service Lead', department:'Customer Service', status:'Active', hireDate:'2016-12-05', id:'NLC-0028', salary:1600000},
      {name:'Peter Ssali', title:'Finance Officer', department:'Finance', status:'Active', hireDate:'2014-08-19', id:'NLC-0011', salary:2100000},
      {name:'Maria Nankya', title:'Procurement Officer', department:'Procurement', status:'Probation', hireDate:'2026-03-23', id:'NLC-0103', salary:1400000},
      {name:'Tom Walukamba', title:'IT Support Specialist', department:'IT Support', status:'Active', hireDate:'2022-05-30', id:'NLC-0096', salary:1800000},
      {name:'Agnes Babirye', title:'Border Clearance Officer', department:'Fleet Operations', status:'On leave', hireDate:'2017-10-14', id:'NLC-0039', salary:1550000}
    ],
    activity:[
      {text:'David Kato requested leave for Jun 22–24', when:'Today, 8:02 AM'},
      {text:'Agnes Babirye requested leave for Jun 20–23', when:'Yesterday'},
      {text:'Fleet Operations headcount review scheduled for next week', when:'2 days ago'},
      {text:'Maria Nankya completed week 6 of onboarding', when:'3 days ago'},
      {text:'Dispatch shift schedule for July is ready for review', when:'4 days ago'}
    ],
    celebrations:[
      {emoji:'🎉', name:'Peter Ssali', meta:'12 year work anniversary · Jun 24'},
      {emoji:'🎂', name:'Irene Nansubuga', meta:'Birthday · Jun 29'}
    ]
  },
  emb: {
    key:'emb', shortName:'Equator Microfinance Bank', mark:'EQ',
    accent:'#38507A', accentStrong:'#263A5C', accentSoft:'#E4E9F2', defaultAccent:'#38507A',
    domain:'equatormfb.co.ug', plan:'Growth plan',
    industry:'Financial Services', location:'Kololo, Kampala', contactPhone:'+256 781 502 933',
    currentUser:{ name:'Diana Kemigisha', role:'HR Business Partner' },
    members:[
      { name:'Diana Kemigisha', role:'Owner', status:'Active' },
      { name:'Edward Tumusiime', role:'Admin', status:'Active' },
      { name:'Carol Nakimuli', role:'Member', status:'Active' }
    ],
    departments:['Branch Operations','Credit & Lending','Risk & Compliance','Customer Service','Finance','IT Support','Human Resources'],
    openRequisitions:4, reviewsThisMonth:6, currentCycle:'Q2 2026',
    currency:'UGX', currencySymbol:'UGX ',
    leavePolicy:{ annual:21, sick:10, compassionate:4, maternity:84, carryover:5, noticeDays:7, blackout:['2026-12-24','2026-12-25','2026-12-31'] },
    managerOf:{ 'EMB-0027':null, 'EMB-0006':'EMB-0027', 'EMB-0058':'EMB-0006', 'EMB-0071':'EMB-0006', 'EMB-0034':'EMB-0027', 'EMB-0119':'EMB-0034', 'EMB-0089':'EMB-0006', 'EMB-0042':'EMB-0006', 'EMB-0015':'EMB-0027', 'EMB-0098':'EMB-0027', 'EMB-0049':'EMB-0058' },
    savedReports:[],
    shifts:{},
    benefits:[
      {id:'BEN-E1', name:'Staff medical scheme', category:'Health', emoji:'🏥', value:300000, desc:'Comprehensive cover for employee and up to two dependants', active:true},
      {id:'BEN-E2', name:'NSSF pension', category:'Retirement', emoji:'🏦', value:0, desc:'Mandatory employer (10%) and employee (5%) contributions', active:true},
      {id:'BEN-E3', name:'Housing allowance', category:'Housing', emoji:'🏠', value:350000, desc:'Monthly housing supplement for branch managers and above', active:true},
      {id:'BEN-E4', name:'Professional development fund', category:'Education', emoji:'🎓', value:800000, desc:'Annual fund for banking and finance qualifications', active:true},
      {id:'BEN-E5', name:'Gym & wellness subsidy', category:'Wellness', emoji:'💪', value:60000, desc:'Contribution to any accredited gym membership', active:false}
    ],
    expenses:[
      {id:'EXP-E1', employeeId:'EMB-0006', category:'Travel', desc:'Mbarara branch opening oversight trip', amount:1450000, date:'2026-06-08', status:'Pending'},
      {id:'EXP-E2', employeeId:'EMB-0034', category:'Training', desc:'AML compliance certification', amount:680000, date:'2026-06-10', status:'Approved'},
      {id:'EXP-E3', employeeId:'EMB-0015', category:'Equipment', desc:'Financial audit software licence renewal', amount:1100000, date:'2026-06-06', status:'Approved'},
      {id:'EXP-E4', employeeId:'EMB-0058', category:'Meals', desc:'Client relationship dinner — Mbarara', amount:220000, date:'2026-06-12', status:'Pending'},
      {id:'EXP-E5', employeeId:'EMB-0098', category:'Communication', desc:'IT infrastructure assessment travel', amount:390000, date:'2026-06-14', status:'Pending'}
    ],
    assets:[
      {id:'AST-E1', name:'Core banking server', category:'Computer', serial:'SRV-CB-001', assignedTo:'EMB-0098', status:'In use', value:45000000, purchaseDate:'2022-01-15'},
      {id:'AST-E2', name:'ATM unit — Kampala HQ', category:'Computer', serial:'ATM-KLA-001', assignedTo:'', status:'In use', value:28000000, purchaseDate:'2021-09-10'},
      {id:'AST-E3', name:'Cash counting machine', category:'Tools', serial:'CCM-2023-002', assignedTo:'EMB-0089', status:'In use', value:3500000, purchaseDate:'2023-04-20'},
      {id:'AST-E4', name:'Security camera system', category:'Other', serial:'CAM-2022-HQ', assignedTo:'', status:'In use', value:8000000, purchaseDate:'2022-07-05'},
      {id:'AST-E5', name:'Dell OptiPlex workstation', category:'Computer', serial:'DL-OPX-014', assignedTo:'', status:'Available', value:1600000, purchaseDate:'2023-11-30'},
      {id:'AST-E6', name:'Fingerprint scanner set', category:'Other', serial:'FPS-2023-005', assignedTo:'', status:'Maintenance', value:950000, purchaseDate:'2023-03-18'}
    ],
    courses:[
      {id:'CRS-E1', title:'Anti-money laundering (AML)', category:'Compliance', emoji:'💰', durationHrs:4, mandatory:true, deadline:'2026-07-31', completions:{}},
      {id:'CRS-E2', title:'Know your customer (KYC)', category:'Compliance', emoji:'🪪', durationHrs:3, mandatory:true, deadline:'2026-08-15', completions:{}},
      {id:'CRS-E3', title:'Credit risk assessment', category:'Finance', emoji:'📊', durationHrs:6, mandatory:false, deadline:'2026-09-30', completions:{}},
      {id:'CRS-E4', title:'Digital banking & mobile money', category:'Technical', emoji:'📱', durationHrs:3, mandatory:false, deadline:'2026-10-31', completions:{}}
    ],
    surveys:[
      {id:'SRV-E1', title:'Q2 Branch staff pulse check', type:'Pulse check', deadline:'2026-06-28', anonymous:true, responses:8, total:11, score:71},
      {id:'SRV-E2', title:'New teller onboarding feedback', type:'Onboarding', deadline:'2026-07-05', anonymous:false, responses:2, total:3, score:null}
    ],
    pulseTrend:[65, 68, 70, 69, 71, 71],
    recognition:[
      {id:'REC-E1', from:'EMB-0027', to:'EMB-0034', value:'🌟 Excellence', message:"Carol's compliance audit preparation was thorough and professional — the cleanest audit we have ever had.", when:'Yesterday'},
      {id:'REC-E2', from:'EMB-0006', to:'EMB-0058', value:'🎯 Results', message:'Ruth exceeded her Q2 disbursement target by 18%. Outstanding client relationships.', when:'1 week ago'}
    ],
    enrolments:{},
    tickets:[
      {id:'TKT-E1', employeeId:'EMB-0089', category:'IT Support', subject:'Teller system running slowly', desc:'The core banking terminal at the Kampala HQ branch has been very slow since this morning.', priority:'High', status:'Open', created:'2026-06-19'},
      {id:'TKT-E2', employeeId:'EMB-0119', category:'HR Query', subject:'Question about probation review timeline', desc:'Would like to know when my 90-day probation review is scheduled.', priority:'Low', status:'Open', created:'2026-06-16'},
      {id:'TKT-E3', employeeId:'EMB-0058', category:'Access & Permissions', subject:'Need credit approval system access', desc:'Promoted to senior loan officer and need elevated access to the credit approval workflow.', priority:'Medium', status:'In progress', created:'2026-06-17'},
      {id:'TKT-E4', employeeId:'EMB-0015', category:'Payroll', subject:'Tax certificate request', desc:'Need my annual tax certificate for a mortgage application.', priority:'Medium', status:'Resolved', created:'2026-06-05'}
    ],
    announcements:[
      {id:'ANN-E1', title:'Mbarara branch grand opening — 15 July', category:'Event', body:'We are excited to announce the grand opening of our new Mbarara branch on 15 July. All staff are invited to the opening ceremony, with transport arranged from Kampala HQ for those wishing to attend.', pinned:true, author:'Diana Kemigisha', when:'1 day ago'},
      {id:'ANN-E2', title:'Updated AML compliance requirements', category:'Urgent', body:'New anti-money laundering reporting thresholds take effect from 1 July per the latest central bank circular. All branch staff must complete the updated AML refresher course by 30 June.', pinned:false, author:'Carol Nakimuli', when:'4 days ago'},
      {id:'ANN-E3', title:'Staff savings scheme now open for enrolment', category:'General', body:'The new staff savings scheme offering preferential interest rates is now open for enrolment. Visit HR to sign up before the end of the month.', pinned:false, author:'Diana Kemigisha', when:'2 weeks ago'}
    ],
    travelRequests:[
      {id:'TRV-E1', employeeId:'EMB-0006', destination:'Mbarara, Uganda', purpose:'New branch opening oversight', departDate:'2026-07-13', returnDate:'2026-07-16', cost:950000, status:'Pending'},
      {id:'TRV-E2', employeeId:'EMB-0034', destination:'Nairobi, Kenya', purpose:'Regional compliance certification', departDate:'2026-07-08', returnDate:'2026-07-11', cost:2400000, status:'Approved'},
      {id:'TRV-E3', employeeId:'EMB-0098', destination:'Kampala (local)', purpose:'Core banking system vendor visit', departDate:'2026-06-24', returnDate:'2026-06-24', cost:150000, status:'Approved'}
    ],
    onboardingPlans:[
      {id:'OB-E1', employeeId:'EMB-0119', buddyId:'EMB-0034', startDate:'2026-02-16', checklist:{ 'Sign contract & HR paperwork':true, 'IT account & equipment setup':true, 'Department orientation':true, 'Meet your buddy':true, 'Complete mandatory training':false, 'First week check-in':true, '30-day review scheduled':false }}
    ],
    knowledgeArticles:[
      {id:'KB-E1', title:'Know your customer (KYC) procedures', category:'HR Policies', content:'All customer-facing staff must complete KYC verification training before handling account opening. Refresher training is required annually per central bank regulation.', author:'Carol Nakimuli', updated:'2026-05-20'},
      {id:'KB-E2', title:'Housing allowance eligibility', category:'Benefits', content:'Housing allowance of UGX 350,000 per month is available to branch managers and above. Eligible staff should submit proof of tenancy or mortgage to HR to begin receiving the allowance.', author:'Diana Kemigisha', updated:'2026-04-12'},
      {id:'KB-E3', title:'Cash handling and till reconciliation', category:'Finance', content:'Tellers must reconcile their till at the start and end of each shift. Discrepancies over UGX 50,000 must be reported immediately to the branch manager and logged in the daily variance report.', author:'Edward Tumusiime', updated:'2026-03-08'},
      {id:'KB-E4', title:'Professional development fund — how to apply', category:'Benefits', content:'Staff may apply for up to UGX 800,000 annually toward banking and finance qualifications. Applications are reviewed quarterly by HR and require manager sign-off.', author:'Diana Kemigisha', updated:'2026-02-14'}
    ],
    hireTrend:[1,1,0,2,2,1],
    successionPlan:[
      {id:'SUC-E1', role:'Chief Executive Officer', incumbentId:'EMB-0027', candidateId:'EMB-0006', readiness:'soon', notes:'Josephine is the natural successor. She needs 2 years as Deputy MD and completion of the executive banking diploma.'},
      {id:'SUC-E2', role:'Head of Credit', incumbentId:'EMB-0034', candidateId:'EMB-0058', readiness:'ready', notes:'Ruth is already performing at Head of Credit level. The transition can happen within 6 months.'},
      {id:'SUC-E3', role:'IT Director', incumbentId:'EMB-0098', candidateId:'EMB-0049', readiness:'dev', notes:'Grace needs 2–3 years of system architecture experience and vendor management skills before she can lead the function.'}
    ],
    workforcePlan:[
      {dept:'Branch Operations', current:4, planned:6, budget:19000000},
      {dept:'Credit & Lending', current:3, planned:4, budget:14000000},
      {dept:'Risk & Compliance', current:2, planned:2, budget:8000000},
      {dept:'IT Support', current:2, planned:3, budget:9500000}
    ],
    meritCycle:{ label:'FY 2026–27 Merit Cycle', status:'Open', proposals:[
      {employeeId:"EMB-0034", currentSalary:6200000, proposedIncreasePct:10, justification:"Led cleanest compliance audit in the bank's history. Exceptional standards.", status:"Approved"},
      {employeeId:'EMB-0058', currentSalary:4800000, proposedIncreasePct:8, justification:'Exceeded Q2 disbursement target by 18%. Best loan quality ratios in the branch.', status:'Pending'},
      {employeeId:'EMB-0098', currentSalary:5100000, proposedIncreasePct:6, justification:'Zero IT incidents in Q2. Completed core banking upgrade on time and under budget.', status:'Pending'}
    ]},
    salaryBands:[
      {grade:'Grade A – Executive / Director', deptTag:'Branch Operations', minSalary:6000000, midSalary:8500000, maxSalary:12000000},
      {grade:'Grade B – Senior Manager', deptTag:'Credit & Lending', minSalary:4000000, midSalary:5500000, maxSalary:7000000},
      {grade:'Grade C – Manager / Specialist', deptTag:'Risk & Compliance', minSalary:2500000, midSalary:3500000, maxSalary:4500000},
      {grade:'Grade D – Officer / Associate', deptTag:'IT Support', minSalary:1500000, midSalary:2200000, maxSalary:3000000}
    ],
    signatureRequests:[
      {id:'SIG-E1', docName:'Employment contract — Lydia Nakayima', docType:'Employment contract', signeeId:'EMB-0119', requestedDate:'2026-02-15', deadline:'2026-02-22', status:'Signed', signedDate:'2026-02-19'},
      {id:'SIG-E2', docName:'Promotion letter — Senior Loan Officer', docType:'Promotion letter', signeeId:'EMB-0058', requestedDate:'2026-06-18', deadline:'2026-06-25', status:'Pending', signedDate:null},
      {id:'SIG-E3', docName:'AML policy acknowledgement — all staff', docType:'Policy acknowledgement', signeeId:'EMB-0027', requestedDate:'2026-06-20', deadline:'2026-06-30', status:'Pending', signedDate:null},
      {id:'SIG-E4', docName:'Mbarara branch opening NDA', docType:'NDA', signeeId:'EMB-0006', requestedDate:'2026-06-10', deadline:'2026-06-17', status:'Signed', signedDate:'2026-06-16'}
    ],
    leaveRequests:[
      {id:'LR-E1', employeeId:'EMB-0042', type:'Sick', startDate:'2026-06-15', endDate:'2026-06-25', status:'Approved'},
      {id:'LR-E2', employeeId:'EMB-0049', type:'Annual', startDate:'2026-06-10', endDate:'2026-06-28', status:'Approved'},
      {id:'LR-E3', employeeId:'EMB-0089', type:'Annual', startDate:'2026-07-07', endDate:'2026-07-11', status:'Pending'},
      {id:'LR-E4', employeeId:'EMB-0071', type:'Compassionate', startDate:'2026-06-23', endDate:'2026-06-23', status:'Pending'}
    ],
    avgTimeToHireDays:21,
    nextPayDate:'2026-06-25', lastPayDate:'2026-05-25', payRunStatus:'Scheduled',
    goals:[
      {id:'GL-E1', title:'Grow Mbarara branch loan book by 20%', department:'Credit & Lending', progress:58, status:'On track', dueDate:'2026-10-01'},
      {id:'GL-E2', title:'Complete annual compliance audit', department:'Risk & Compliance', progress:90, status:'On track', dueDate:'2026-07-10'},
      {id:'GL-E3', title:'Reduce teller transaction time', department:'Branch Operations', progress:35, status:'At risk', dueDate:'2026-08-30'},
      {id:'GL-E4', title:'Migrate core banking system module', department:'IT Support', progress:100, status:'Completed', dueDate:'2026-06-10'}
    ],
    team:[
      {employeeId:'EMB-0027', role:'Owner'},
      {employeeId:'EMB-0006', role:'Admin'},
      {employeeId:'EMB-0015', role:'Billing admin'}
    ],
    invites:[],
    billing:{ priceUGX:650000, seatsLimit:12, storageUsedGB:31, storageLimitGB:60, nextBillingDate:'2026-06-28' },
    security:{ mfaRequired:true, ssoEnabled:true, ipRestricted:true },
    auditLog:[
      {text:'Diana Kemigisha signed in from Kampala, Uganda', when:'Today, 8:03 AM'},
      {text:'Single sign-on enabled for all branches', when:'1 week ago'},
      {text:'Edward Tumusiime added as workspace admin', when:'1 month ago'}
    ],
    openings:[
      {id:'OP-E1', title:'Loan Officer, Mbarara Branch', department:'Credit & Lending', location:'Mbarara', applicants:7, status:'Open', postedDate:'2026-05-18'},
      {id:'OP-E2', title:'Compliance Analyst', department:'Risk & Compliance', location:'Kampala HQ', applicants:4, status:'Open', postedDate:'2026-06-03'},
      {id:'OP-E3', title:'Bank Teller, Gulu Branch', department:'Branch Operations', location:'Gulu', applicants:12, status:'Open', postedDate:'2026-05-25'}
    ],
    candidates:[
      {id:'CD-E1', name:'Phillip Kyaligonza', role:'Loan Officer, Mbarara Branch', stage:'Interview', appliedDate:'2026-06-01'},
      {id:'CD-E2', name:'Cynthia Nantume', role:'Loan Officer, Mbarara Branch', stage:'Screening', appliedDate:'2026-06-09'},
      {id:'CD-E3', name:'Fred Ariko', role:'Compliance Analyst', stage:'Applied', appliedDate:'2026-06-12'},
      {id:'CD-E4', name:'Sharon Akumu', role:'Bank Teller, Gulu Branch', stage:'Offer', appliedDate:'2026-05-29'},
      {id:'CD-E5', name:'Brian Otim', role:'Bank Teller, Gulu Branch', stage:'Screening', appliedDate:'2026-06-04'},
      {id:'CD-E6', name:'Doreen Nantongo', role:'Bank Teller, Gulu Branch', stage:'Applied', appliedDate:'2026-06-16'},
      {id:'CD-E7', name:'Patrick Lubowa', role:'Compliance Analyst', stage:'Applied', appliedDate:'2026-05-22'},
      {id:'CD-E8', name:'Maureen Kansiime', role:'Loan Officer, Mbarara Branch', stage:'Hired', appliedDate:'2026-04-25'}
    ],
    employees:[
      {name:'Diana Kemigisha', title:'HR Business Partner', department:'Human Resources', status:'Active', hireDate:'2018-06-04', id:'EMB-0027', salary:3100000},
      {name:'Edward Tumusiime', title:'Branch Manager', department:'Branch Operations', status:'Active', hireDate:'2013-03-18', id:'EMB-0006', salary:4200000},
      {name:'Ruth Nakirya', title:'Loan Officer', department:'Credit & Lending', status:'Active', hireDate:'2019-09-09', id:'EMB-0058', salary:1900000},
      {name:'Geoffrey Asiimwe', title:'Credit Analyst', department:'Credit & Lending', status:'Active', hireDate:'2020-07-21', id:'EMB-0071', salary:1850000},
      {name:'Carol Nakimuli', title:'Compliance Officer', department:'Risk & Compliance', status:'Active', hireDate:'2016-11-30', id:'EMB-0034', salary:2400000},
      {name:'Daniel Lubega', title:'Risk Analyst', department:'Risk & Compliance', status:'Probation', hireDate:'2026-02-16', id:'EMB-0119', salary:1700000},
      {name:'Esther Achieng', title:'Teller', department:'Branch Operations', status:'Active', hireDate:'2021-04-12', id:'EMB-0089', salary:1100000},
      {name:'Moses Kiggundu', title:'Customer Service Officer', department:'Customer Service', status:'On leave', hireDate:'2017-05-25', id:'EMB-0042', salary:1200000},
      {name:'Patricia Akello', title:'Finance Officer', department:'Finance', status:'Active', hireDate:'2015-01-10', id:'EMB-0015', salary:2200000},
      {name:'Joel Mutebi', title:'IT Support Specialist', department:'IT Support', status:'Active', hireDate:'2022-08-08', id:'EMB-0098', salary:1850000},
      {name:'Winnie Nalubega', title:'Loan Officer', department:'Credit & Lending', status:'On leave', hireDate:'2018-12-03', id:'EMB-0049', salary:1900000}
    ],
    activity:[
      {text:'Moses Kiggundu requested leave for Jun 25–27', when:'Today, 7:48 AM'},
      {text:'Winnie Nalubega requested leave for Jun 21–28', when:'Yesterday'},
      {text:"Daniel Lubega's probation review is due in 9 days", when:'2 days ago'},
      {text:'Credit & Lending met its Q2 disbursement target', when:'3 days ago'},
      {text:'Onboarding checklist updated for new tellers', when:'5 days ago'}
    ],
    celebrations:[
      {emoji:'🎉', name:'Edward Tumusiime', meta:'13 year work anniversary · Jun 26'},
      {emoji:'🎂', name:'Esther Achieng', meta:'Birthday · Jun 30'}
    ]
  }
};

const DOC_TEMPLATES = ['Employment contract.pdf','National ID copy.pdf','Academic certificates.pdf','Signed offer letter.pdf'];

/* ===================================================================== PERSISTENCE */

const STORAGE_KEY = 'vantage-hr-state-v1';

async function persistState(){
  try{
    if(!window.storage) return;
    const payload = {
      tenants: TENANTS,
      currentTenant: state.tenant,
      theme: document.documentElement.getAttribute('data-theme')
    };
    await window.storage.set(STORAGE_KEY, JSON.stringify(payload), false);
  } catch(e){
    console.error('Could not save changes', e);
  }
}

async function loadPersistedState(){
  try{
    if(!window.storage) return;
    const result = await window.storage.get(STORAGE_KEY, false);
    if(result && result.value){
      const payload = JSON.parse(result.value);
      if(payload.tenants){
        Object.keys(payload.tenants).forEach(key=>{
          if(TENANTS[key]) Object.assign(TENANTS[key], payload.tenants[key]);
        });
      }
      if(payload.currentTenant && TENANTS[payload.currentTenant]) state.tenant = payload.currentTenant;
      if(payload.theme) document.documentElement.setAttribute('data-theme', payload.theme);
    }
  } catch(e){
    /* No saved data yet, or storage unavailable — continue with the sample data */
  }
}

async function resetAllData(){
  if(!confirm('Reset all sample data back to its original state? This clears any changes you have made and cannot be undone.')) return;
  try{
    if(window.storage) await window.storage.delete(STORAGE_KEY, false);
  } catch(e){ /* nothing saved yet */ }
  location.reload();
}

const STAGE_ORDER = ['Applied','Screening','Interview','Offer','Hired'];

/* ===================================================================== STATE */

const state = {
  tenant:'krh',
  page:'dashboard',
  sort:{ key:'name', dir:'asc' },
  filters:{ search:'', department:'All', status:'All' },
  drawerId:null,
  undo:null,
  empLoaded:false,
  recruitFilter:null,
  candidateSearch:'',
  reviewModalId:null,
  reviewModalStars:0,
  reportTab:'workforce',
  reportDateFrom:'',
  reportDateTo:'',
  settingsTab:'general',
  editingEmployeeId:null,
  viewingAsRole:'Owner',
  bulkSelected:[],
  candidateModalId:null,
  offerCandidateId:null,
  careersView:false,
  careersOpeningId:null,
  payslipEmployeeId:null,
  scorecardCandidateId:null,
  scorecardRatings:{},
  shiftWeekOffset:0,
  shiftAssignContext:null,
  orgChartDeptFilter:''
};

function currentTenant(){ return TENANTS[state.tenant]; }
function findEmployee(id){ return currentTenant().employees.find(e=>e.id===id); }

function isReadOnlyPreview(){ return state.viewingAsRole === 'Viewer'; }
function blockIfReadOnly(){
  if(isReadOnlyPreview()){
    showToast("You're previewing as Viewer. Switch roles in Settings → Team to make changes.");
    return true;
  }
  return false;
}

/* ===================================================================== HELPERS */

function initials(name){
  return name.replace('Dr. ','').split(' ').filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase();
}
function formatDate(iso){
  const d = new Date(iso+'T00:00:00');
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function hashStr(s){
  let h = 0;
  for(let i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) >>> 0; }
  return h;
}
function emailFor(name, tenant){
  const parts = name.replace('Dr. ','').toLowerCase().split(' ').filter(Boolean);
  return parts.join('.') + '@' + tenant.domain;
}
function phoneFor(id){
  const h = hashStr(id);
  const mid = String(700000000 + (h % 99999999)).slice(0,9);
  return '+256 ' + mid.slice(0,3) + ' ' + mid.slice(3,6) + ' ' + mid.slice(6,9);
}
function ensureLeaveBalance(e){
  if(!e.leaveBalance){
    const h = hashStr(e.id);
    e.leaveBalance = {
      annual:{ used: 4 + (h % 14), total: 21 },
      sick:{ used: h % 6, total: 10 },
      compassionate:{ used: h % 3, total: 4 }
    };
  }
  return e.leaveBalance;
}
function leaveFor(id){
  const e = findEmployee(id);
  if(!e) return { annual:{used:0,total:21}, sick:{used:0,total:10}, compassionate:{used:0,total:4} };
  return ensureLeaveBalance(e);
}
function buildSparkPath(values, w, h){
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = (max - min) || 1;
  const stepX = w / (values.length - 1);
  return values.map((v,i)=>{
    const x = i*stepX;
    const y = h - ((v - min)/range) * (h-4) - 2;
    return (i===0?'M':'L') + x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
}

/* ===================================================================== TOAST */

function showToast(message, opts){
  opts = opts || {};
  const stack = document.getElementById('toast-stack');
  const el = document.createElement('div');
  el.className = 'toast';
  const span = document.createElement('span');
  span.textContent = message;
  el.appendChild(span);
  if(opts.actionLabel){
    const btn = document.createElement('button');
    btn.textContent = opts.actionLabel;
    btn.addEventListener('click', ()=>{
      if(opts.onAction) opts.onAction();
      dismiss();
    });
    el.appendChild(btn);
  }
  stack.appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  let dismissed = false;
  function dismiss(){
    if(dismissed) return;
    dismissed = true;
    el.classList.remove('show');
    setTimeout(()=> el.remove(), 220);
  }
  setTimeout(dismiss, opts.duration || 4200);
}

function logActivity(t, text){
  t.activity.unshift({ text, when:'Just now' });
  if(t.activity.length > 8) t.activity.length = 8;
}

function logEmployeeHistory(e, text){
  if(!e.history) e.history = [];
  const stamp = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
  e.history.unshift({ text, when: stamp });
  if(e.history.length > 12) e.history.length = 12;
}

/* ===================================================================== THEME / TENANT */

function applyTenantTheme(tenant){
  const root = document.documentElement;
  root.style.setProperty('--accent', tenant.accent);
  root.style.setProperty('--accent-strong', tenant.accentStrong);
  root.style.setProperty('--accent-soft', tenant.accentSoft);

  document.getElementById('org-mark').textContent = tenant.mark;
  document.getElementById('org-name').textContent = tenant.shortName;
  document.getElementById('tenant-btn-label').textContent = tenant.shortName;
  document.getElementById('tenant-dot').style.background = tenant.accent;
  document.getElementById('plan-pill').textContent = tenant.plan;
  document.getElementById('user-name').textContent = tenant.currentUser.name;
  document.getElementById('user-role').textContent = tenant.currentUser.role;
  document.getElementById('user-avatar').textContent = initials(tenant.currentUser.name);
  document.title = tenant.shortName + ' · Vantage HR';

  const hour = new Date().getHours();
  const part = hour < 12 ? 'morning' : (hour < 17 ? 'afternoon' : 'evening');
  const firstName = tenant.currentUser.name.split(' ')[0];
  document.getElementById('greeting').textContent = 'Good ' + part + ', ' + firstName;
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

function renderTenantMenu(){
  const menu = document.getElementById('tenant-menu');
  menu.innerHTML = '';
  Object.values(TENANTS).forEach(t=>{
    const btn = document.createElement('button');
    btn.className = 'tenant-option';
    btn.setAttribute('role','menuitem');
    btn.innerHTML =
      '<span class="swatch" style="background:'+t.accent+'">'+t.mark+'</span>'+
      '<span class="label"><span class="name">'+t.shortName+'</span><span class="meta">'+t.employees.length+' people · '+t.plan+'</span></span>'+
      (t.key===state.tenant ? '<svg class="check" viewBox="0 0 24 24" fill="none" stroke-width="2.2"><path d="M5 13l4 4L19 7"/></svg>' : '');
    btn.addEventListener('click', ()=>{
      if(t.key !== state.tenant){
        state.tenant = t.key;
        state.filters = { search:'', department:'All', status:'All' };
        state.sort = { key:'name', dir:'asc' };
        state.empLoaded = false;
        state.bulkSelected = [];
        state.recruitFilter = null;
        state.candidateSearch = '';
        applyTenantTheme(t);
        renderTenantMenu();
        renderDashboard();
        renderEmployeesPage(true);
        renderLeavePage();
        renderRecruitPage();
        renderPayrollPage();
        renderPerformancePage();
        state.reportTab = 'workforce';
        state.reportDateFrom = '';
        state.reportDateTo = '';
        state.orgChartDeptFilter = '';
        state.shiftWeekOffset = 0;
        renderReportsPage();
        state.settingsTab = 'general';
        renderSettingsPage();
        renderOrgChart();
        renderNotifications();
        renderBenefitsPage();
        renderExpensesPage();
        renderAssetsPage();
        renderLearningPage();
        renderEngagementPage();
        renderServiceDeskPage();
        renderAnnouncementsPage();
        renderTravelPage();
        renderOnboardingPage();
        renderKnowledgePage();
        persistState();
        showToast('Switched to ' + t.shortName);
      }
      closeTenantMenu();
    });
    menu.appendChild(btn);
  });
}

let tenantMenuOpen = false;
function openTenantMenu(){ tenantMenuOpen = true; document.getElementById('tenant-menu').classList.add('open'); document.getElementById('tenant-btn').setAttribute('aria-expanded','true'); }
function closeTenantMenu(){ tenantMenuOpen = false; document.getElementById('tenant-menu').classList.remove('open'); document.getElementById('tenant-btn').setAttribute('aria-expanded','false'); }

/* ===================================================================== DASHBOARD */

function renderDashboard(){
  const t = currentTenant();
  const pending = t.employees.filter(e=>e.status==='On leave').length;
  const avgYears = (t.employees.reduce((sum,e)=>{
    const yrs = (Date.now() - new Date(e.hireDate)) / (1000*60*60*24*365.25);
    return sum + yrs;
  },0) / t.employees.length).toFixed(1);

  const kpis = [
    { label:'Headcount', value:String(t.employees.length), delta:'+'+t.hireTrend.reduce((a,b)=>a+b,0)+' in 6 months', up:true, spark:t.hireTrend, page:'employees' },
    { label:'Open requisitions', value:String(t.openRequisitions), delta:'Across '+t.departments.length+' departments', up:false, spark:null, page:'recruitment' },
    { label:'Pending leave requests', value:String(pending), delta: pending ? 'Awaiting your review' : 'All caught up', up:false, spark:null, page:'leave' },
    { label:'Average tenure', value:avgYears+' yrs', delta:'Across the whole team', up:false, spark:null, page:'employees' }
  ];

  const row = document.getElementById('kpi-row');
  row.innerHTML = '';
  kpis.forEach(k=>{
    const card = document.createElement('div');
    card.className = 'kpi-card kpi-clickable';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label','Go to ' + k.label);
    let sparkSvg = '';
    if(k.spark){
      const path = buildSparkPath(k.spark, 74, 30);
      sparkSvg = '<svg class="spark" viewBox="0 0 74 30"><path d="'+path+'" fill="none" stroke="'+t.accent+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    card.innerHTML =
      '<div class="label">'+k.label+'</div>'+
      '<div class="value-row"><span class="value">'+k.value+'</span>'+sparkSvg+'</div>'+
      '<div class="delta'+(k.up?' up':'')+'">'+k.delta+'</div>';
    const go = ()=>{
      goToPage(k.page);
      if(k.page === 'employees') renderEmployeesPage(false);
      if(k.page === 'leave') renderLeavePage();
      if(k.page === 'recruitment') renderRecruitPage();
    };
    card.addEventListener('click', go);
    card.addEventListener('keydown', (ev)=>{ if(ev.key === 'Enter') go(); });
    row.appendChild(card);
  });

  const deptCounts = {};
  t.departments.forEach(d=> deptCounts[d] = 0);
  t.employees.forEach(e=> deptCounts[e.department] = (deptCounts[e.department]||0)+1);
  const maxCount = Math.max(...Object.values(deptCounts), 1);
  const chart = document.getElementById('dept-chart');
  chart.innerHTML = '';
  Object.entries(deptCounts).sort((a,b)=>b[1]-a[1]).forEach(([dept,count])=>{
    const row2 = document.createElement('div');
    row2.className = 'dept-row';
    row2.innerHTML =
      '<span class="dname">'+dept+'</span>'+
      '<span class="dept-bar-track"><span class="dept-bar-fill" style="width:'+ (count/maxCount*100) +'%"></span></span>'+
      '<span class="dcount">'+count+'</span>';
    chart.appendChild(row2);
  });
  document.getElementById('dept-total-hint').textContent = t.employees.length + ' people total';

  const actList = document.getElementById('activity-list');
  actList.innerHTML = '';
  t.activity.forEach(a=>{
    const li = document.createElement('li');
    li.innerHTML = '<span class="dot"></span><span class="txt">'+a.text+'<span class="when">'+a.when+'</span></span>';
    actList.appendChild(li);
  });

  const celList = document.getElementById('celebr-list');
  celList.innerHTML = '';
  t.celebrations.forEach(c=>{
    const li = document.createElement('li');
    li.innerHTML = '<span class="emoji">'+c.emoji+'</span><span class="txt"><span class="name">'+c.name+'</span><span class="meta">'+c.meta+'</span></span>';
    celList.appendChild(li);
  });
}

/* ===================================================================== EMPLOYEES PAGE */

function filteredSortedEmployees(){
  const t = currentTenant();
  let list = t.employees.filter(e=>{
    if(state.filters.department !== 'All' && e.department !== state.filters.department) return false;
    if(state.filters.status !== 'All' && e.status !== state.filters.status) return false;
    if(state.filters.search){
      const q = state.filters.search.toLowerCase();
      const hay = (e.name+' '+e.title+' '+e.department).toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
  const { key, dir } = state.sort;
  list = list.slice().sort((a,b)=>{
    let av = a[key], bv = b[key];
    if(key==='hireDate'){ av = new Date(av); bv = new Date(bv); }
    else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
    if(av < bv) return dir==='asc' ? -1 : 1;
    if(av > bv) return dir==='asc' ? 1 : -1;
    return 0;
  });
  return list;
}

function renderDeptChips(){
  const t = currentTenant();
  const wrap = document.getElementById('dept-chips');
  wrap.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'chip' + (state.filters.department==='All' ? ' active' : '');
  all.textContent = 'All departments';
  all.dataset.dept = 'All';
  wrap.appendChild(all);
  t.departments.forEach(d=>{
    const chip = document.createElement('button');
    chip.className = 'chip' + (state.filters.department===d ? ' active' : '');
    chip.textContent = d;
    chip.dataset.dept = d;
    wrap.appendChild(chip);
  });
  wrap.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      state.filters.department = chip.dataset.dept;
      renderDeptChips();
      renderEmployeeTable();
    });
  });
}

function renderStatusChips(){
  document.querySelectorAll('#status-chips .chip').forEach(chip=>{
    chip.classList.toggle('active', chip.dataset.status === state.filters.status);
    chip.onclick = ()=>{
      state.filters.status = chip.dataset.status;
      renderStatusChips();
      renderEmployeeTable();
    };
  });
}

function renderSortHeaders(){
  document.querySelectorAll('.emp-table th.sortable').forEach(th=>{
    const key = th.dataset.sort;
    th.classList.toggle('sorted', key === state.sort.key);
    const arrow = th.querySelector('.arrow');
    if(key === state.sort.key){
      arrow.textContent = state.sort.dir === 'asc' ? '↑' : '↓';
    } else {
      arrow.textContent = '↑';
    }
  });
}

function skeletonRows(n){
  const tbody = document.getElementById('emp-tbody');
  tbody.innerHTML = '';
  for(let i=0;i<n;i++){
    const tr = document.createElement('tr');
    tr.className = 'skeleton-row';
    tr.innerHTML =
      '<td><div class="who-cell"><span class="sk" style="width:32px;height:32px;border-radius:50%;"></span><span class="sk" style="width:120px;height:12px;"></span></div></td>'+
      '<td><span class="sk" style="width:110px;height:12px;display:inline-block;"></span></td>'+
      '<td><span class="sk" style="width:70px;height:18px;display:inline-block;border-radius:999px;"></span></td>'+
      '<td><span class="sk" style="width:80px;height:12px;display:inline-block;"></span></td>'+
      '<td><span class="sk" style="width:70px;height:12px;display:inline-block;"></span></td>'+
      '<td></td>';
    tbody.appendChild(tr);
  }
}

function statusPillHtml(status){
  const cls = status==='Active' ? 'status-active' : (status==='On leave' ? 'status-leave' : 'status-probation');
  return '<span class="status-pill '+cls+'"><span class="dot"></span>'+status+'</span>';
}

function renderEmployeeTable(){
  const tbody = document.getElementById('emp-tbody');
  const list = filteredSortedEmployees();
  document.getElementById('result-count').textContent = list.length + ' of ' + currentTenant().employees.length + ' people';
  renderSortHeaders();

  const visibleIds = list.map(e=>e.id);
  state.bulkSelected = state.bulkSelected.filter(id=> visibleIds.includes(id));

  if(list.length === 0){
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state"><div class="glyph">🔎</div><h4>No one matches yet</h4><p>Try a different name, role, or department, or clear the filters above.</p></div></td></tr>';
    renderBulkBar();
    return;
  }

  tbody.innerHTML = '';
  list.forEach(e=>{
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    const checked = state.bulkSelected.includes(e.id);
    tr.innerHTML =
      '<td><input type="checkbox" class="row-select" data-row-select="'+e.id+'" '+(checked?'checked':'')+' aria-label="Select '+e.name+'"></td>'+
      '<td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span><span class="name">'+e.name+'</span><br><span class="title">'+e.title+'</span></span></div></td>'+
      '<td>'+e.department+'</td>'+
      '<td>'+statusPillHtml(e.status)+'</td>'+
      '<td>'+formatDate(e.hireDate)+'</td>'+
      '<td class="id-cell">'+e.id+'</td>'+
      '<td><div class="row-menu-wrap">'+
        '<button class="kebab-btn" data-kebab="'+e.id+'" aria-label="More actions for '+e.name+'"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none"/></svg></button>'+
        '<div class="row-menu" id="rowmenu-'+e.id+'"><button data-edit="'+e.id+'">Edit employee</button><button data-archive="'+e.id+'">Archive employee</button></div>'+
      '</div></td>';
    tr.addEventListener('click', (ev)=>{
      if(ev.target.closest('.row-menu-wrap') || ev.target.classList.contains('row-select')) return;
      openDrawer(e.id);
    });
    tr.addEventListener('keydown', (ev)=>{
      if(ev.key==='Enter') openDrawer(e.id);
    });
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('[data-row-select]').forEach(cb=>{
    cb.addEventListener('click', (ev)=> ev.stopPropagation());
    cb.addEventListener('change', ()=>{
      const id = cb.dataset.rowSelect;
      if(cb.checked){
        if(!state.bulkSelected.includes(id)) state.bulkSelected.push(id);
      } else {
        state.bulkSelected = state.bulkSelected.filter(x=>x!==id);
      }
      renderBulkBar();
      const allBox = document.getElementById('select-all-emp');
      if(allBox) allBox.checked = state.bulkSelected.length > 0 && visibleIds.every(id=> state.bulkSelected.includes(id));
    });
  });

  tbody.querySelectorAll('[data-kebab]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      const id = btn.dataset.kebab;
      const menu = document.getElementById('rowmenu-'+id);
      const isOpen = menu.classList.contains('open');
      closeAllRowMenus();
      if(!isOpen) menu.classList.add('open');
    });
  });
  tbody.querySelectorAll('[data-edit]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      openAddModal(btn.dataset.edit);
      closeAllRowMenus();
    });
  });
  tbody.querySelectorAll('[data-archive]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      archiveEmployee(btn.dataset.archive);
      closeAllRowMenus();
    });
  });

  renderBulkBar();
}

function renderBulkBar(){
  const bar = document.getElementById('bulk-bar');
  const count = state.bulkSelected.length;
  bar.style.display = count > 0 ? 'flex' : 'none';
  document.getElementById('bulk-count').textContent = count + (count === 1 ? ' person selected' : ' people selected');
}

function clearBulkSelection(){
  state.bulkSelected = [];
  renderEmployeeTable();
}

function bulkArchiveSelected(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const ids = state.bulkSelected.slice();
  if(ids.length === 0) return;
  const removed = [];
  ids.forEach(id=>{
    const idx = t.employees.findIndex(e=>e.id===id);
    if(idx !== -1) removed.push(t.employees.splice(idx,1)[0]);
  });
  logActivity(t, removed.length + ' people were archived in bulk');
  state.bulkSelected = [];
  renderEmployeeTable();
  renderDeptChips();
  renderDashboard();
  renderLeavePage();
  renderPayrollPage();
  renderPerformancePage();
  persistState();
  showToast(removed.length + ' people archived', {
    actionLabel:'Undo',
    duration:6000,
    onAction:()=>{
      t.employees.push(...removed);
      logActivity(t, 'Bulk archive of ' + removed.length + ' people was undone');
      renderEmployeeTable();
      renderDeptChips();
      renderDashboard();
      renderLeavePage();
      renderPayrollPage();
      renderPerformancePage();
      persistState();
    }
  });
}

function bulkExportSelected(){
  const t = currentTenant();
  const ids = state.bulkSelected.slice();
  if(ids.length === 0) return;
  const rows = [['Name','Title','Department','Status','Hire date','Employee ID']];
  ids.forEach(id=>{
    const e = findEmployee(id);
    if(e) rows.push([e.name, e.title, e.department, e.status, e.hireDate, e.id]);
  });
  downloadCSV('selected-employees-' + t.key + '.csv', rows);
  showToast('Exported ' + ids.length + ' people to CSV');
}

function closeAllRowMenus(){
  document.querySelectorAll('.row-menu.open').forEach(m=>m.classList.remove('open'));
}

function archiveEmployee(id){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const idx = t.employees.findIndex(e=>e.id===id);
  if(idx === -1) return;
  const [removed] = t.employees.splice(idx,1);
  logActivity(t, removed.name + ' was archived from the directory');
  renderEmployeeTable();
  renderDeptChips();
  renderDashboard();
  renderLeavePage();
  renderPayrollPage();
  renderPerformancePage();
  persistState();
  showToast(removed.name + ' was archived', {
    actionLabel:'Undo',
    duration:6000,
    onAction:()=>{
      t.employees.splice(idx,0,removed);
      logActivity(t, removed.name + "'s archive was undone");
      renderEmployeeTable();
      renderDeptChips();
      renderDashboard();
      renderLeavePage();
      renderPayrollPage();
      renderPerformancePage();
      persistState();
    }
  });
}

function renderEmployeesPage(forceReload){
  const t = currentTenant();
  document.getElementById('emp-sub').textContent = t.shortName + ' · ' + t.employees.length + ' people across ' + t.departments.length + ' departments';
  renderDeptChips();
  renderStatusChips();
  document.getElementById('emp-search').value = state.filters.search;

  if(forceReload || !state.empLoaded){
    skeletonRows(6);
    setTimeout(()=>{
      state.empLoaded = true;
      renderEmployeeTable();
    }, 520);
  } else {
    renderEmployeeTable();
  }
}

/* ===================================================================== LEAVE & ATTENDANCE */

function dateOnly(iso){ return new Date(iso+'T00:00:00'); }

function shortDateRange(start, end){
  const opts = { day:'numeric', month:'short' };
  const s = dateOnly(start), e = dateOnly(end);
  if(start === end) return s.toLocaleDateString('en-GB', opts);
  return s.toLocaleDateString('en-GB', opts) + ' – ' + e.toLocaleDateString('en-GB', opts);
}

function renderPendingRequests(){
  const t = currentTenant();
  const pending = t.leaveRequests.filter(r=>r.status==='Pending');
  document.getElementById('pending-hint').textContent = pending.length + (pending.length===1 ? ' awaiting your review' : ' awaiting your review');
  const list = document.getElementById('request-list');
  if(pending.length === 0){
    list.innerHTML = '<div class="empty-inline">No pending requests right now. New ones will show up here.</div>';
    return;
  }
  list.innerHTML = '';
  pending.forEach(r=>{
    const e = findEmployee(r.employeeId);
    if(!e) return;
    const row = document.createElement('div');
    row.className = 'request-row';
    row.innerHTML =
      '<span class="avatar">'+initials(e.name)+'</span>'+
      '<span class="rmeta"><span class="rname">'+e.name+'</span><span class="rdetail">'+e.department+' · '+shortDateRange(r.startDate, r.endDate)+'</span></span>'+
      '<span class="rtype">'+r.type+'</span>'+
      '<span class="ractions"><button class="deny" data-deny="'+r.id+'">Deny</button><button class="approve" data-approve="'+r.id+'">Approve</button></span>';
    list.appendChild(row);
  });
  list.querySelectorAll('[data-approve]').forEach(btn=>{
    btn.addEventListener('click', ()=> decideRequest(btn.dataset.approve, 'Approved'));
  });
  list.querySelectorAll('[data-deny]').forEach(btn=>{
    btn.addEventListener('click', ()=> decideRequest(btn.dataset.deny, 'Denied'));
  });
}

function decideRequest(requestId, decision){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const req = t.leaveRequests.find(r=>r.id===requestId);
  if(!req) return;
  req.status = decision;
  const e = findEmployee(req.employeeId);
  if(e && decision === 'Approved'){
    e.status = 'On leave';
    const days = Math.round((dateOnly(req.endDate) - dateOnly(req.startDate)) / 86400000) + 1;
    const key = req.type.toLowerCase();
    const balance = ensureLeaveBalance(e);
    if(balance[key]){
      balance[key].used = Math.min(balance[key].total, balance[key].used + days);
    }
    logEmployeeHistory(e, req.type + ' leave approved for ' + shortDateRange(req.startDate, req.endDate));
    logActivity(t, e.name + "'s " + req.type.toLowerCase() + ' leave request was approved');
  } else if(e && decision === 'Denied'){
    logEmployeeHistory(e, req.type + ' leave request denied');
  }
  renderPendingRequests();
  renderWeekStrip();
  renderLeaveKpis();
  renderAttendanceLog();
  renderEmployeeTable();
  renderDeptChips();
  renderDashboard();
  persistState();
  if(e){
    const msg = decision === 'Approved' ? e.name + "'s leave request was approved" : e.name + "'s leave request was denied";
    showToast(msg);
    pushNotification(msg, 'Leave');
  }
}

function renderWeekStrip(){
  const t = currentTenant();
  const strip = document.getElementById('week-strip');
  strip.innerHTML = '';
  const today = new Date(); today.setHours(0,0,0,0);
  for(let i=0;i<7;i++){
    const day = new Date(today);
    day.setDate(day.getDate() + i);
    const dayCol = document.createElement('div');
    dayCol.className = 'week-day' + (i===0 ? ' is-today' : '');
    const label = day.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
    let inner = '<div class="wd-label">' + (i===0 ? 'Today' : label) + '</div>';
    const onLeave = t.leaveRequests.filter(r=>{
      if(r.status === 'Denied') return false;
      const s = dateOnly(r.startDate), e = dateOnly(r.endDate);
      return day >= s && day <= e;
    });
    if(onLeave.length === 0){
      inner += '<div class="wd-empty">Full team in</div>';
    } else {
      onLeave.forEach(r=>{
        const emp = findEmployee(r.employeeId);
        if(!emp) return;
        const firstName = emp.name.replace('Dr. ','').split(' ')[0];
        inner += '<div class="wd-name' + (r.status==='Pending' ? ' pending' : '') + '">' + firstName + (r.status==='Pending' ? ' (pending)' : '') + '</div>';
      });
    }
    dayCol.innerHTML = inner;
    strip.appendChild(dayCol);
  }
}

function attendanceFor(id){
  const h = hashStr(id);
  if(h % 23 === 0) return { status:'Absent', clockIn:'—', clockOut:'—' };
  const minute = h % 40;
  const clockIn = '08:' + String(minute).padStart(2,'0');
  const isLate = (h % 10) < 2;
  const outMinute = 15 + (h % 30);
  const clockOut = '17:' + String(outMinute).padStart(2,'0');
  return { status: isLate ? 'Late' : 'On time', clockIn, clockOut };
}

function renderAttendanceLog(){
  const t = currentTenant();
  const tbody = document.getElementById('attendance-tbody');
  tbody.innerHTML = '';
  let present = 0, onLeaveCount = 0;
  t.employees.forEach(e=>{
    const tr = document.createElement('tr');
    if(e.status === 'On leave'){
      onLeaveCount++;
      tr.innerHTML =
        '<td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span class="name">'+e.name+'</span></div></td>'+
        '<td>'+e.department+'</td>'+
        '<td>—</td><td>—</td>'+
        '<td><span class="att-status leave">On leave</span></td>';
    } else {
      const att = attendanceFor(e.id);
      if(att.status !== 'Absent') present++;
      const cls = att.status === 'Absent' ? 'absent' : (att.status === 'Late' ? 'late' : 'on-time');
      tr.innerHTML =
        '<td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span class="name">'+e.name+'</span></div></td>'+
        '<td>'+e.department+'</td>'+
        '<td>'+att.clockIn+'</td><td>'+att.clockOut+'</td>'+
        '<td><span class="att-status '+cls+'">'+att.status+'</span></td>';
    }
    tbody.appendChild(tr);
  });
  const base = t.employees.length - onLeaveCount;
  const rate = base > 0 ? Math.round((present/base)*100) : 100;
  document.getElementById('attendance-hint').textContent = rate + '% present today';
}

function renderLeaveKpis(){
  const t = currentTenant();
  const pendingCount = t.leaveRequests.filter(r=>r.status==='Pending').length;
  const onLeaveCount = t.employees.filter(e=>e.status==='On leave').length;
  const avgBalance = Math.round(t.employees.reduce((sum,e)=>{
    const l = leaveFor(e.id);
    return sum + (l.annual.total - l.annual.used);
  },0) / t.employees.length);

  const kpis = [
    { label:'Pending requests', value:String(pendingCount), delta: pendingCount ? 'Needs your review' : 'All caught up' },
    { label:'On leave today', value:String(onLeaveCount), delta:'Out of ' + t.employees.length + ' people' },
    { label:'Avg. annual days left', value:String(avgBalance), delta:'Out of 21 days a year' },
    { label:'Reviews due this month', value:String(t.reviewsThisMonth), delta:'Across all departments' }
  ];
  const row = document.getElementById('leave-kpi-row');
  row.innerHTML = '';
  kpis.forEach(k=>{
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = '<div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div>';
    row.appendChild(card);
  });
}

function renderLeavePage(){
  const t = currentTenant();
  document.getElementById('leave-sub').textContent = t.shortName + ' · leave and attendance overview';
  renderLeaveKpis();
  renderPendingRequests();
  renderWeekStrip();
  renderAttendanceLog();
  renderLeavePolicySummary();
  renderHolidayCalendar();
}

const UGANDA_HOLIDAYS_2026 = [
  { date:'2026-01-01', name:"New Year's Day" },
  { date:'2026-01-26', name:'Liberation Day' },
  { date:'2026-02-16', name:'Archbishop Luwum Day' },
  { date:'2026-03-08', name:"International Women's Day" },
  { date:'2026-04-03', name:'Good Friday' },
  { date:'2026-04-06', name:'Easter Monday' },
  { date:'2026-05-01', name:'Labour Day' },
  { date:'2026-06-03', name:'Martyrs\' Day' },
  { date:'2026-06-09', name:'National Heroes Day' },
  { date:'2026-10-09', name:'Independence Day' },
  { date:'2026-12-25', name:'Christmas Day' },
  { date:'2026-12-26', name:'Boxing Day' }
];

function renderHolidayCalendar(){
  const el = document.getElementById('holiday-list');
  if(!el) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const upcoming = UGANDA_HOLIDAYS_2026.filter(h=> dateOnly(h.date) >= today);
  if(upcoming.length === 0){
    el.innerHTML = '<div class="empty-inline">No more public holidays this year.</div>';
    return;
  }
  el.innerHTML = upcoming.slice(0,6).map(h=>{
    const d = dateOnly(h.date);
    const daysAway = Math.round((d - today) / 86400000);
    const tag = daysAway === 0 ? '<span class="status-pill status-active" style="padding:3px 9px;"><span class="dot"></span>Today</span>'
      : daysAway <= 14 ? '<span class="cc-notes-badge" style="margin:0;">In '+daysAway+' days</span>' : '';
    return '<div class="review-row"><span class="rvmeta"><span class="rvname">'+h.name+'</span><span class="rvdetail">'+formatDate(h.date)+'</span></span>'+tag+'</div>';
  }).join('');
}

function renderLeavePolicySummary(){
  const el = document.getElementById('leave-policy-summary');
  if(!el) return;
  const p = currentTenant().leavePolicy;
  if(!p){ el.innerHTML = ''; return; }
  el.innerHTML =
    '<div class="panel" style="background:var(--paper-sunken);">'+
    '<div class="panel-head" style="margin-bottom:8px;"><h3 style="font-size:13.5px;">Active leave policy</h3></div>'+
    '<div style="display:flex; gap:18px; flex-wrap:wrap; font-size:12.5px; color:var(--ink-soft);">'+
    '<span>Annual <strong>'+p.annual+' days</strong></span>'+
    '<span>Sick <strong>'+p.sick+' days</strong></span>'+
    '<span>Compassionate <strong>'+p.compassionate+' days</strong></span>'+
    '<span>Maternity <strong>'+p.maternity+' days</strong></span>'+
    '<span>Max carry-over <strong>'+p.carryover+' days</strong></span>'+
    '<span>Min notice <strong>'+p.noticeDays+' days</strong></span>'+
    (p.blackout && p.blackout.length ? '<span>Blackout dates: <strong>'+p.blackout.join(', ')+'</strong></span>' : '')+
    '</div></div>';
}

/* ===================================================================== RECRUITMENT */

function statusPillRoleHtml(status){
  const cls = status === 'Open' ? 'status-open' : 'status-hold';
  return '<span class="status-pill '+cls+'"><span class="dot"></span>'+status+'</span>';
}

function daysAgoLabel(iso){
  const days = Math.round((Date.now() - dateOnly(iso)) / 86400000);
  if(days <= 0) return 'Posted today';
  if(days === 1) return 'Posted yesterday';
  return 'Posted ' + days + ' days ago';
}

function candidateCardHtml(c){
  let body = '';
  if(c.stage === 'Interview'){
    const h = hashStr(c.id);
    const day = new Date(); day.setDate(day.getDate() + 1 + (h % 5));
    const hour = 9 + (h % 7);
    const mins = (h % 2 === 0) ? '00' : '30';
    const label = day.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
    body += '<div class="cc-sched">Interview ' + label + ' · ' + hour + ':' + mins + '</div>';
    const hasScore = c.scorecard && Object.keys(c.scorecard.ratings||{}).length > 0;
    const ratings = hasScore ? Object.values(c.scorecard.ratings) : [];
    const avg = hasScore ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : null;
    body += '<div class="cc-actions" style="margin-top:6px;"><button class="cc-offer" data-scorecard="'+c.id+'">'+(hasScore ? '★ Scorecard · '+avg+'/5' : '+ Fill scorecard')+'</button></div>';
  }
  const noteCount = (c.notes || []).length;
  const noteBadge = noteCount > 0 ? '<span class="cc-notes-badge">' + noteCount + ' note' + (noteCount===1?'':'s') + '</span>' : '';
  if(c.stage === 'Hired'){
    body += '<div class="cc-badge">Hired</div>';
  } else if(c.stage === 'Offer'){
    body += '<div class="cc-actions">'+
      '<button class="cc-reject" data-reject="'+c.id+'">Reject</button>'+
      '<button class="cc-advance" data-advance="'+c.id+'">Move to Hired</button>'+
    '</div>'+
    '<div class="cc-actions" style="margin-top:6px;"><button class="cc-offer" data-offer="'+c.id+'">Generate offer letter</button></div>';
  } else {
    const idx = STAGE_ORDER.indexOf(c.stage);
    const nextStage = STAGE_ORDER[idx + 1];
    body += '<div class="cc-actions">'+
      '<button class="cc-reject" data-reject="'+c.id+'">Reject</button>'+
      '<button class="cc-advance" data-advance="'+c.id+'">Move to '+nextStage+'</button>'+
    '</div>';
  }
  return '<div class="candidate-card" draggable="true" data-candidate-id="'+c.id+'">'+
    '<div class="cc-top"><span class="avatar">'+initials(c.name)+'</span><span><span class="cc-name">'+c.name+'</span><span class="cc-role">'+c.role+'</span></span></div>'+
    noteBadge +
    body +
  '</div>';
}

function renderKanban(){
  const t = currentTenant();
  const board = document.getElementById('kanban-board');
  board.innerHTML = '';
  const q = state.candidateSearch.toLowerCase();
  STAGE_ORDER.forEach(stage=>{
    let list = t.candidates.filter(c=>c.stage===stage);
    if(state.recruitFilter) list = list.filter(c=>c.role === state.recruitFilter);
    if(q) list = list.filter(c=>c.name.toLowerCase().includes(q));
    const col = document.createElement('div');
    col.className = 'kanban-col';
    col.dataset.stage = stage;
    let inner = '<div class="kc-head"><span class="kc-title">'+stage+'</span><span class="kc-count">'+list.length+'</span></div>';
    inner += list.length === 0 ? '<div class="kc-empty">No one here</div>' : list.map(candidateCardHtml).join('');
    col.innerHTML = inner;
    board.appendChild(col);
  });

  board.querySelectorAll('[data-advance]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{ ev.stopPropagation(); advanceCandidate(btn.dataset.advance); });
  });
  board.querySelectorAll('[data-reject]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{ ev.stopPropagation(); rejectCandidate(btn.dataset.reject); });
  });
  board.querySelectorAll('[data-offer]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{ ev.stopPropagation(); openOfferModal(btn.dataset.offer); });
  });
  board.querySelectorAll('[data-scorecard]').forEach(btn=>{
    btn.addEventListener('click', (ev)=>{ ev.stopPropagation(); openScorecardModal(btn.dataset.scorecard); });
  });

  board.querySelectorAll('.candidate-card').forEach(card=>{
    card.addEventListener('click', (ev)=>{
      if(ev.target.closest('.cc-actions')) return;
      openCandidateModal(card.dataset.candidateId);
    });
    card.addEventListener('dragstart', (ev)=>{
      ev.dataTransfer.setData('text/plain', card.dataset.candidateId);
      ev.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', ()=> card.classList.remove('dragging'));
  });

  board.querySelectorAll('.kanban-col').forEach(col=>{
    col.addEventListener('dragover', (ev)=>{
      ev.preventDefault();
      col.classList.add('drop-target');
    });
    col.addEventListener('dragleave', ()=> col.classList.remove('drop-target'));
    col.addEventListener('drop', (ev)=>{
      ev.preventDefault();
      col.classList.remove('drop-target');
      const id = ev.dataTransfer.getData('text/plain');
      moveCandidateToStage(id, col.dataset.stage);
    });
  });
}

function moveCandidateToStage(id, newStage){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const c = t.candidates.find(x=>x.id===id);
  if(!c || c.stage === newStage) return;
  const oldStage = c.stage;
  c.stage = newStage;
  logActivity(t, c.name + ' moved from ' + oldStage + ' to ' + newStage);
  renderKanban();
  renderRecruitKpis();
  persistState();
  showToast(c.name + ' moved to ' + newStage);
}

function advanceCandidate(id){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const c = t.candidates.find(x=>x.id===id);
  if(!c) return;
  const idx = STAGE_ORDER.indexOf(c.stage);
  if(idx === -1 || idx >= STAGE_ORDER.length - 1) return;
  c.stage = STAGE_ORDER[idx + 1];
  logActivity(t, c.name + ' moved to ' + c.stage + ' for ' + c.role);
  renderKanban();
  renderRecruitKpis();
  persistState();
  showToast(c.stage === 'Hired' ? c.name + ' was hired for ' + c.role : c.name + ' moved to ' + c.stage);
}

function rejectCandidate(id){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const c = t.candidates.find(x=>x.id===id);
  if(!c) return;
  const previousStage = c.stage;
  c.stage = 'Rejected';
  logActivity(t, c.name + "'s application for " + c.role + ' was closed');
  renderKanban();
  renderRecruitKpis();
  persistState();
  showToast(c.name + "'s application was closed", {
    actionLabel:'Undo',
    duration:6000,
    onAction:()=>{
      c.stage = previousStage;
      renderKanban();
      renderRecruitKpis();
      persistState();
    }
  });
}

function findCandidate(id){ return currentTenant().candidates.find(c=>c.id===id); }

function openCandidateModal(id){
  const c = findCandidate(id);
  if(!c) return;
  state.candidateModalId = id;
  document.getElementById('candidate-modal-title').textContent = c.name;
  document.getElementById('candidate-modal-meta').textContent = c.role + ' · ' + c.stage + ' · Applied ' + formatDate(c.appliedDate);
  document.getElementById('candidate-note-text').value = '';
  renderCandidateNotes();
  document.getElementById('candidate-modal-overlay').classList.add('open');
}
function closeCandidateModal(){
  document.getElementById('candidate-modal-overlay').classList.remove('open');
  state.candidateModalId = null;
}

function renderCandidateNotes(){
  const c = findCandidate(state.candidateModalId);
  const list = document.getElementById('candidate-notes-list');
  if(!c){ list.innerHTML = ''; return; }
  const notes = c.notes || [];
  list.innerHTML = notes.length === 0
    ? '<div class="empty-inline">No notes yet. Add one below after a call or interview.</div>'
    : notes.map(n=> '<div class="cand-note">'+n.text+'<span class="cn-when">'+n.when+'</span></div>').join('');
}

function addCandidateNote(){
  if(blockIfReadOnly()) return;
  const c = findCandidate(state.candidateModalId);
  if(!c) return;
  const text = document.getElementById('candidate-note-text').value.trim();
  if(!text){ showToast('Write a note before adding it'); return; }
  if(!c.notes) c.notes = [];
  const stamp = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
  c.notes.unshift({ text, when: stamp });
  document.getElementById('candidate-note-text').value = '';
  renderCandidateNotes();
  renderKanban();
  persistState();
  showToast('Note added for ' + c.name);
}

function buildOfferLetterHtml(c, t){
  const start = new Date(); start.setDate(start.getDate() + 14);
  const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  return ''+
    '<h2 style="color:'+t.accent+';">'+t.shortName+'</h2>'+
    '<div class="offer-meta">'+today+'</div>'+
    '<p>Dear '+c.name+',</p>'+
    '<p>We are delighted to offer you the position of <strong>'+c.role+'</strong> at '+t.shortName+'. This letter sets out the key details of our offer.</p>'+
    '<p><strong>Start date:</strong> '+start.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})+'<br>'+
    '<strong>Reporting to:</strong> Department lead, '+c.role.split(',')[0]+'<br>'+
    '<strong>Work location:</strong> '+t.shortName+'</p>'+
    '<p>Compensation and benefits will be confirmed separately in your employment contract.</p>'+
    '<p>We are genuinely excited about the possibility of you joining the team. Please let us know if you have any questions.</p>'+
    '<p>Warm regards,<br>'+t.currentUser.name+'<br>'+t.currentUser.role+', '+t.shortName+'</p>';
}

function openOfferModal(id){
  const c = findCandidate(id);
  if(!c) return;
  state.offerCandidateId = id;
  const t = currentTenant();
  const html = buildOfferLetterHtml(c, t);
  document.getElementById('offer-preview').innerHTML = html;
  document.getElementById('print-area').innerHTML = html;
  document.getElementById('offer-modal-overlay').classList.add('open');
}
function closeOfferModal(){ document.getElementById('offer-modal-overlay').classList.remove('open'); }

/* ===================================================================== CAREERS / PUBLIC JOB BOARD */

function openCareersView(){
  const t = currentTenant();
  document.getElementById('careers-org-mark').textContent = t.mark;
  document.getElementById('careers-org-name').textContent = t.shortName;
  document.getElementById('careers-title').textContent = 'Open roles at ' + t.shortName;
  renderCareersRoles();
  showCareersPane('roles');
  document.getElementById('shell').style.display = 'none';
  document.getElementById('careers-view').style.display = 'block';
  window.scrollTo(0,0);
}

function closeCareersView(){
  document.getElementById('careers-view').style.display = 'none';
  document.getElementById('shell').style.display = 'flex';
}

function showCareersPane(pane){
  document.getElementById('careers-roles-view').style.display = pane === 'roles' ? 'block' : 'none';
  document.getElementById('careers-apply-view').style.display = pane === 'apply' ? 'block' : 'none';
  document.getElementById('careers-thanks-view').style.display = pane === 'thanks' ? 'block' : 'none';
}

function renderCareersRoles(){
  const t = currentTenant();
  const open = t.openings.filter(o=>o.status==='Open');
  const list = document.getElementById('careers-roles-list');
  if(open.length === 0){
    list.innerHTML = '<div class="empty-inline">No open roles right now. Check back soon.</div>';
    return;
  }
  list.innerHTML = open.map(o=>
    '<div class="careers-role-card"><div class="crc-info"><div class="crc-title">'+o.title+'</div>'+
    '<div class="crc-meta">'+o.department+' · '+o.location+'</div></div>'+
    '<button class="btn btn-primary" data-apply-role="'+o.id+'">Apply now</button></div>'
  ).join('');
  list.querySelectorAll('[data-apply-role]').forEach(btn=>{
    btn.addEventListener('click', ()=> openCareersApply(btn.dataset.applyRole));
  });
}

function openCareersApply(openingId){
  const t = currentTenant();
  const opening = t.openings.find(o=>o.id===openingId);
  if(!opening) return;
  state.careersOpeningId = openingId;
  document.getElementById('careers-apply-title').textContent = 'Apply for ' + opening.title;
  document.getElementById('careers-apply-sub').textContent = opening.department + ' · ' + opening.location + ' at ' + t.shortName;
  document.getElementById('ca-name').value = '';
  document.getElementById('ca-email').value = '';
  document.getElementById('ca-phone').value = '';
  document.getElementById('ca-note').value = '';
  showCareersPane('apply');
}

function submitCareersApplication(){
  const t = currentTenant();
  const opening = t.openings.find(o=>o.id===state.careersOpeningId);
  if(!opening) return;
  const name = document.getElementById('ca-name').value.trim();
  const email = document.getElementById('ca-email').value.trim();
  if(!name || !email || !email.includes('@')){
    showToast('Add your name and a valid email to apply');
    return;
  }
  const newId = 'CD-' + t.key.toUpperCase() + '-' + (t.candidates.length + 1) + '-' + Date.now().toString().slice(-4);
  const note = document.getElementById('ca-note').value.trim();
  t.candidates.push({
    id:newId, name, role:opening.title, stage:'Applied',
    appliedDate:new Date().toISOString().slice(0,10),
    notes: note ? [{ text:'From application form: ' + note, when:'Just now' }] : [],
    applicantEmail:email, applicantPhone:document.getElementById('ca-phone').value.trim()
  });
  opening.applicants = (opening.applicants || 0) + 1;
  logActivity(t, name + ' applied for ' + opening.title);
  persistState();
  document.getElementById('careers-thanks-text').textContent = "Thanks for applying to " + opening.title + " at " + t.shortName + ". The hiring team will be in touch if there's a match.";
  showCareersPane('thanks');
  renderRecruitPage();
}

function renderOpeningsList(){
  const t = currentTenant();
  const wrap = document.getElementById('openings-list');
  wrap.innerHTML = '';
  t.openings.forEach(o=>{
    const row = document.createElement('div');
    row.className = 'role-row' + (state.recruitFilter === o.title ? ' active-filter' : '');
    row.innerHTML =
      '<span class="rmid"><span class="rtitle">'+o.title+'</span><span class="rloc">'+o.location+'</span></span>'+
      '<span class="rdept">'+o.department+'</span>'+
      statusPillRoleHtml(o.status)+
      '<span class="rapps">'+o.applicants+' applicants</span>'+
      '<span class="rdate">'+daysAgoLabel(o.postedDate)+'</span>';
    row.addEventListener('click', ()=>{
      state.recruitFilter = (state.recruitFilter === o.title) ? null : o.title;
      renderOpeningsList();
      renderRoleFilterChip();
      renderKanban();
    });
    wrap.appendChild(row);
  });
}

function renderRoleFilterChip(){
  const wrap = document.getElementById('role-filter-chip');
  if(!state.recruitFilter){ wrap.innerHTML = ''; return; }
  wrap.innerHTML = '<span class="filter-chip">Filtered: '+state.recruitFilter+'<button id="clear-role-filter" aria-label="Clear filter"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg></button></span>';
  document.getElementById('clear-role-filter').addEventListener('click', ()=>{
    state.recruitFilter = null;
    renderOpeningsList();
    renderRoleFilterChip();
    renderKanban();
  });
}

function renderRecruitKpis(){
  const t = currentTenant();
  const openRoles = t.openings.filter(o=>o.status==='Open').length;
  const activeCandidates = t.candidates.filter(c=>c.stage!=='Hired' && c.stage!=='Rejected').length;
  const interviews = t.candidates.filter(c=>c.stage==='Interview').length;
  const kpis = [
    { label:'Open roles', value:String(openRoles), delta: t.openings.length + ' total postings' },
    { label:'Active candidates', value:String(activeCandidates), delta:'In the pipeline' },
    { label:'Interviews this week', value:String(interviews), delta:'Scheduled' },
    { label:'Average time to hire', value:t.avgTimeToHireDays+' days', delta:'From application to offer' }
  ];
  const row = document.getElementById('recruit-kpi-row');
  row.innerHTML = '';
  kpis.forEach(k=>{
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = '<div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div>';
    row.appendChild(card);
  });
}

function renderRecruitPage(){
  const t = currentTenant();
  const activeCandidates = t.candidates.filter(c=>c.stage!=='Hired' && c.stage!=='Rejected').length;
  document.getElementById('recruit-sub').textContent = t.openings.filter(o=>o.status==='Open').length + ' open roles · ' + activeCandidates + ' active candidates';
  document.getElementById('pipeline-hint').textContent = t.candidates.length + ' candidates total';
  document.getElementById('candidate-search').value = state.candidateSearch;
  renderRecruitKpis();
  renderOpeningsList();
  renderRoleFilterChip();
  renderKanban();
}

function openOpeningModal(){
  const t = currentTenant();
  const sel = document.getElementById('o-dept');
  sel.innerHTML = t.departments.map(d=>'<option>'+d+'</option>').join('');
  document.getElementById('o-title').value = '';
  document.getElementById('o-location').value = '';
  document.getElementById('o-status').value = 'Open';
  document.getElementById('opening-modal-overlay').classList.add('open');
  setTimeout(()=> document.getElementById('o-title').focus(), 50);
}
function closeOpeningModal(){ document.getElementById('opening-modal-overlay').classList.remove('open'); }

function submitOpening(){
  if(blockIfReadOnly()) return;
  const title = document.getElementById('o-title').value.trim();
  const department = document.getElementById('o-dept').value;
  const location = document.getElementById('o-location').value.trim();
  const status = document.getElementById('o-status').value;
  if(!title || !location){
    showToast('Add a role title and location to continue');
    return;
  }
  const t = currentTenant();
  const newId = 'OP-' + t.key.toUpperCase() + '-' + (t.openings.length + 1);
  t.openings.push({ id:newId, title, department, location, applicants:0, status, postedDate: new Date().toISOString().slice(0,10) });
  logActivity(t, 'New opening posted: ' + title);
  closeOpeningModal();
  renderOpeningsList();
  renderRecruitKpis();
  persistState();
  showToast(title + ' was posted');
}

/* ===================================================================== PAYROLL */

function formatUGX(n){
  if(typeof formatCurrency === 'function') return formatCurrency(n);
  return 'UGX ' + Math.round(n).toLocaleString('en-US');
}

/* Simplified, illustrative bands for demonstration only — not official tax guidance */
function payeFor(gross){
  let remaining = gross;
  let tax = 0;
  if(remaining > 3000000){ tax += (remaining - 3000000) * 0.28; remaining = 3000000; }
  if(remaining > 1000000){ tax += (remaining - 1000000) * 0.18; remaining = 1000000; }
  tax += remaining * 0.10;
  return Math.round(tax);
}
function nssfEmployeeFor(gross){ return Math.round(gross * 0.05); }
function nssfEmployerFor(gross){ return Math.round(gross * 0.10); }
function netPayFor(gross){ return gross - payeFor(gross) - nssfEmployeeFor(gross); }
function netPayForEmployee(e){ return netPayFor(e.salary) + (e.oneTimeBonus||0) - (e.oneTimeDeduction||0); }

function renderPayrollKpis(){
  const t = currentTenant();
  const totalGross = t.employees.reduce((s,e)=>s+e.salary,0);
  const avgGross = totalGross / t.employees.length;
  const employerNssf = t.employees.reduce((s,e)=>s+nssfEmployerFor(e.salary),0);
  const kpis = [
    { label:'Monthly payroll', value:formatUGX(totalGross), delta: t.employees.length + ' people' },
    { label:'Average gross salary', value:formatUGX(avgGross), delta:'Across the whole team' },
    { label:'Employer NSSF contribution', value:formatUGX(employerNssf), delta:'10% sample rate' },
    { label:'Next pay run', value:formatDate(t.nextPayDate), delta:t.payRunStatus }
  ];
  const row = document.getElementById('payroll-kpi-row');
  row.innerHTML = '';
  kpis.forEach(k=>{
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = '<div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div>';
    row.appendChild(card);
  });
}

function renderPayrunCard(){
  const t = currentTenant();
  const badge = document.getElementById('payrun-status-badge');
  const text = document.getElementById('payrun-status-text');
  badge.className = 'payrun-status ' + t.payRunStatus.toLowerCase();
  text.textContent = t.payRunStatus;
  const totalNet = t.employees.reduce((s,e)=>s+netPayForEmployee(e),0);
  document.getElementById('payrun-line-1').innerHTML = '<strong>'+formatDate(t.nextPayDate)+'</strong> for ' + t.employees.length + ' employees';
  document.getElementById('payrun-line-2').innerHTML = 'Estimated net payout: <strong>'+formatUGX(totalNet)+'</strong> · last run '+formatDate(t.lastPayDate);
}

function renderPayrollDeptChart(){
  const t = currentTenant();
  const deptTotals = {};
  t.departments.forEach(d=> deptTotals[d] = 0);
  t.employees.forEach(e=> deptTotals[e.department] = (deptTotals[e.department]||0) + e.salary);
  const max = Math.max(...Object.values(deptTotals), 1);
  const totalGross = t.employees.reduce((s,e)=>s+e.salary,0);
  const chart = document.getElementById('payroll-dept-chart');
  chart.innerHTML = '';
  Object.entries(deptTotals).sort((a,b)=>b[1]-a[1]).forEach(([dept,amount])=>{
    if(amount === 0) return;
    const row = document.createElement('div');
    row.className = 'dept-row';
    row.innerHTML = '<span class="dname">'+dept+'</span><span class="dept-bar-track"><span class="dept-bar-fill" style="width:'+(amount/max*100)+'%"></span></span><span class="dcount">'+formatUGX(amount)+'</span>';
    chart.appendChild(row);
  });
  document.getElementById('payroll-total-hint').textContent = formatUGX(totalGross) + ' total gross';
}

function renderSalaryTable(){
  const t = currentTenant();
  const tbody = document.getElementById('salary-tbody');
  tbody.innerHTML = '';
  const sorted = t.employees.slice().sort((a,b)=>b.salary-a.salary);
  sorted.forEach(e=>{
    const paye = payeFor(e.salary);
    const nssf = nssfEmployeeFor(e.salary);
    const net = netPayForEmployee(e);
    const hasAdjust = (e.oneTimeBonus||0) > 0 || (e.oneTimeDeduction||0) > 0;
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    tr.innerHTML =
      '<td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span><span class="name">'+e.name+(hasAdjust?' <span class="cc-notes-badge" style="margin-top:0;">adjusted</span>':'')+'</span><br><span class="title">'+e.title+'</span></span></div></td>'+
      '<td>'+e.department+'</td>'+
      '<td class="salary-cell">'+formatUGX(e.salary)+'</td>'+
      '<td class="salary-cell">'+formatUGX(paye)+'</td>'+
      '<td class="salary-cell">'+formatUGX(nssf)+'</td>'+
      '<td class="salary-cell net">'+formatUGX(net)+'</td>';
    tr.addEventListener('click', ()=> openPayslip(e.id));
    tr.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter') openPayslip(e.id); });
    tbody.appendChild(tr);
  });
}

function buildPayslipHtml(e, t){
  const paye = payeFor(e.salary);
  const nssf = nssfEmployeeFor(e.salary);
  const bonus = e.oneTimeBonus || 0;
  const deduction = e.oneTimeDeduction || 0;
  const net = netPayForEmployee(e);
  let lines =
    '<div class="payslip-line"><span class="pl-label">Gross salary</span><span class="pl-amt">'+formatUGX(e.salary)+'</span></div>'+
    '<div class="payslip-line deduction"><span class="pl-label">PAYE</span><span class="pl-amt">-'+formatUGX(paye)+'</span></div>'+
    '<div class="payslip-line deduction"><span class="pl-label">NSSF employee (5%)</span><span class="pl-amt">-'+formatUGX(nssf)+'</span></div>';
  if(bonus > 0) lines += '<div class="payslip-line"><span class="pl-label">Bonus</span><span class="pl-amt">+'+formatUGX(bonus)+'</span></div>';
  if(deduction > 0) lines += '<div class="payslip-line deduction"><span class="pl-label">Other deduction</span><span class="pl-amt">-'+formatUGX(deduction)+'</span></div>';
  lines +=
    '<div class="payslip-line total"><span class="pl-label">Net pay</span><span class="pl-amt">'+formatUGX(net)+'</span></div>'+
    '<div class="payslip-line"><span class="pl-label">Employer NSSF (10%)</span><span class="pl-amt">'+formatUGX(nssfEmployerFor(e.salary))+'</span></div>';
  return lines;
}

function openPayslip(id){
  const e = findEmployee(id);
  if(!e) return;
  state.payslipEmployeeId = id;
  const t = currentTenant();
  document.getElementById('payslip-name').textContent = e.name;
  document.getElementById('payslip-meta').textContent = e.title + ' · ' + e.department + ' · ' + formatDate(t.nextPayDate);
  document.getElementById('payslip-body').innerHTML = buildPayslipHtml(e, t);
  document.getElementById('ps-bonus').value = e.oneTimeBonus || '';
  document.getElementById('ps-deduction').value = e.oneTimeDeduction || '';
  document.getElementById('payslip-overlay').classList.add('open');
}
function closePayslip(){ document.getElementById('payslip-overlay').classList.remove('open'); }

function applyPayslipAdjustment(){
  if(blockIfReadOnly()) return;
  const e = findEmployee(state.payslipEmployeeId);
  if(!e) return;
  const t = currentTenant();
  const bonus = Number(document.getElementById('ps-bonus').value) || 0;
  const deduction = Number(document.getElementById('ps-deduction').value) || 0;
  e.oneTimeBonus = bonus;
  e.oneTimeDeduction = deduction;
  document.getElementById('payslip-body').innerHTML = buildPayslipHtml(e, t);
  renderSalaryTable();
  renderPayrunCard();
  renderPayrollKpis();
  logEmployeeHistory(e, 'Payroll adjustment applied: ' + (bonus?'+'+formatUGX(bonus)+' bonus ':'') + (deduction?'-'+formatUGX(deduction)+' deduction':''));
  persistState();
  showToast('Adjustment applied for ' + e.name);
}

function printPayslip(){
  const e = findEmployee(state.payslipEmployeeId);
  if(!e) return;
  const t = currentTenant();
  const html =
    '<h2 style="color:'+t.accent+';">'+t.shortName+'</h2>'+
    '<div class="offer-meta">Payslip for ' + formatDate(t.nextPayDate) + '</div>'+
    '<p><strong>'+e.name+'</strong><br>'+e.title+' · '+e.department+'<br>Employee ID: '+e.id+'</p>'+
    '<div style="margin-top:18px;">' + buildPayslipHtml(e, t).replace(/var\(--ink\)/g,'#1A2420').replace(/var\(--danger\)/g,'#AE4438').replace(/var\(--border\)/g,'#DDE3DA') + '</div>';
  document.getElementById('print-area').innerHTML = html;
  window.print();
}

function runPayroll(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  if(t.payRunStatus === 'Processing') return;
  t.payRunStatus = 'Processing';
  renderPayrunCard();
  const btn = document.getElementById('run-payroll-btn');
  btn.disabled = true;
  setTimeout(()=>{
    t.payRunStatus = 'Completed';
    t.lastPayDate = new Date().toISOString().slice(0,10);
    const next = new Date(t.nextPayDate + 'T00:00:00');
    next.setMonth(next.getMonth() + 1);
    t.nextPayDate = next.toISOString().slice(0,10);
    const totalGross = t.employees.reduce((s,e)=>s+e.salary,0);
    const totalNet = t.employees.reduce((s,e)=>s+netPayForEmployee(e),0);
    if(!t.payrollHistory) t.payrollHistory = [];
    t.payrollHistory.unshift({ date:t.lastPayDate, headcount:t.employees.length, totalGross, totalNet });
    if(t.payrollHistory.length > 12) t.payrollHistory.length = 12;
    t.employees.forEach(e=>{ e.oneTimeBonus = 0; e.oneTimeDeduction = 0; });
    logActivity(t, 'Payroll run completed for ' + t.employees.length + ' people');
    pushNotification('Payroll run completed — ' + t.employees.length + ' payslips generated', 'Payroll');
    renderPayrunCard();
    renderPayrollKpis();
    renderPayrollHistory();
    renderSalaryTable();
    btn.disabled = false;
    persistState();
    showToast('Payroll run completed — ' + t.employees.length + ' payslips generated');
  }, 1100);
}

function renderPayrollHistory(){
  const t = currentTenant();
  const list = document.getElementById('payroll-history-list');
  const history = t.payrollHistory || [];
  if(history.length === 0){
    list.innerHTML = '<div class="empty-inline">No payroll runs yet. Run payroll to start building history.</div>';
    return;
  }
  list.innerHTML = history.map(h=>
    '<div class="review-row"><span class="rvmeta"><span class="rvname">'+formatDate(h.date)+'</span>'+
    '<span class="rvdetail">'+h.headcount+' people · '+formatUGX(h.totalGross)+' gross · '+formatUGX(h.totalNet)+' net</span></span></div>'
  ).join('');
}

function renderPayrollPage(){
  const t = currentTenant();
  document.getElementById('payroll-sub').textContent = t.shortName + ' · ' + t.employees.length + ' people on payroll';
  renderCurrencySwitcher();
  const sel = document.getElementById('currency-switcher');
  if(sel) sel.value = t.currency || 'UGX';
  renderPayrollKpis();
  renderPayrunCard();
  renderPayrollHistory();
  renderPayrollDeptChart();
  renderSalaryTable();
}

/* ===================================================================== PERFORMANCE */

function setupReviews(){
  Object.values(TENANTS).forEach(t=> seedReviewsForTenant(t));
}

function seedReviewsForTenant(t){
  t.reviews = {};
  t.employees.forEach(e=>{
    const h = hashStr(e.id);
    let status = 'Not started';
    if(h % 5 === 0) status = 'Completed';
    else if(h % 5 <= 2) status = 'In progress';
    let rating = null;
    if(status === 'Completed') rating = 3 + (hashStr(e.id + 'r') % 3);
    const due = new Date();
    due.setDate(due.getDate() + (h % 21) + 3);
    t.reviews[e.id] = { status, rating, dueDate: due.toISOString().slice(0,10) };
  });
}

function setupReviewsForTenant(t){
  t.reviews = {};
  const due = new Date(); due.setDate(due.getDate() + 30);
  t.employees.forEach(e=>{
    t.reviews[e.id] = { status:'Not started', rating:null, dueDate: due.toISOString().slice(0,10) };
  });
}

function starString(rating){
  return '★★★★★'.slice(0,rating) + '☆☆☆☆☆'.slice(0, 5-rating);
}

function reviewStatusPillHtml(status){
  const cls = status === 'Completed' ? 'status-active' : (status === 'In progress' ? 'status-leave' : 'status-probation');
  return '<span class="status-pill '+cls+'"><span class="dot"></span>'+status+'</span>';
}

function renderReviewList(){
  const t = currentTenant();
  const wrap = document.getElementById('review-list');
  wrap.innerHTML = '';
  t.employees.forEach(e=>{
    const r = t.reviews[e.id];
    if(!r) return;
    const row = document.createElement('div');
    row.className = 'review-row';
    let action = '';
    if(r.status === 'Not started'){
      action = '<button data-start="'+e.id+'">Start review</button>';
    } else if(r.status === 'In progress'){
      action = '<button class="primary" data-rate="'+e.id+'">Complete review</button>';
    } else {
      action = '<span class="rvstars">'+starString(r.rating)+'</span>';
    }
    row.innerHTML =
      '<span class="avatar">'+initials(e.name)+'</span>'+
      '<span class="rvmeta"><span class="rvname">'+e.name+'</span><span class="rvdetail">'+e.department+' · Due '+formatDate(r.dueDate)+'</span></span>'+
      reviewStatusPillHtml(r.status)+
      '<span class="rvaction">'+action+'</span>';
    wrap.appendChild(row);
  });
  document.getElementById('review-hint').textContent = t.employees.length + ' people in this cycle';

  wrap.querySelectorAll('[data-start]').forEach(btn=>{
    btn.addEventListener('click', ()=> startReview(btn.dataset.start));
  });
  wrap.querySelectorAll('[data-rate]').forEach(btn=>{
    btn.addEventListener('click', ()=> openReviewModal(btn.dataset.rate));
  });
}

function startReview(id){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const r = t.reviews[id];
  if(!r) return;
  r.status = 'In progress';
  renderReviewList();
  renderPerfKpis();
  persistState();
  const e = findEmployee(id);
  if(e) showToast(e.name + "'s review is now in progress");
}

function openReviewModal(id){
  state.reviewModalId = id;
  state.reviewModalStars = 0;
  const e = findEmployee(id);
  document.getElementById('review-modal-name').textContent = e ? e.name + ' · ' + e.title : '';
  document.getElementById('review-comment').value = '';
  document.querySelectorAll('#star-picker button').forEach(b=> b.classList.remove('selected'));
  document.getElementById('review-modal-overlay').classList.add('open');
}
function closeReviewModal(){ document.getElementById('review-modal-overlay').classList.remove('open'); }

function submitReviewRating(){
  if(blockIfReadOnly()) return;
  if(!state.reviewModalId || state.reviewModalStars === 0){
    showToast('Choose a rating from 1 to 5 stars');
    return;
  }
  const t = currentTenant();
  const r = t.reviews[state.reviewModalId];
  if(!r) return;
  r.status = 'Completed';
  r.rating = state.reviewModalStars;
  r.comment = document.getElementById('review-comment').value.trim();
  closeReviewModal();
  renderReviewList();
  renderRatingChart();
  renderPerfKpis();
  const e = findEmployee(state.reviewModalId);
  if(e){
    logEmployeeHistory(e, 'Review completed · rated ' + state.reviewModalStars + '/5' + (r.comment ? ' — "' + r.comment + '"' : ''));
    logActivity(t, e.name + "'s review was completed, rated " + state.reviewModalStars + '/5');
  }
  persistState();
  if(e) showToast('Review completed for ' + e.name + ' · rated ' + state.reviewModalStars + '/5');
}

function renderRatingChart(){
  const t = currentTenant();
  const sums = {};
  const counts = {};
  t.departments.forEach(d=>{ sums[d]=0; counts[d]=0; });
  t.employees.forEach(e=>{
    const r = t.reviews[e.id];
    if(r && r.status === 'Completed'){
      sums[e.department] = (sums[e.department]||0) + r.rating;
      counts[e.department] = (counts[e.department]||0) + 1;
    }
  });
  const chart = document.getElementById('rating-chart');
  chart.innerHTML = '';
  const withData = t.departments.filter(d=>counts[d] > 0);
  if(withData.length === 0){
    chart.innerHTML = '<div class="empty-inline">No completed reviews yet this cycle.</div>';
    return;
  }
  withData.sort((a,b)=> (sums[b]/counts[b]) - (sums[a]/counts[a]));
  withData.forEach(d=>{
    const avg = sums[d] / counts[d];
    const row = document.createElement('div');
    row.className = 'dept-row';
    row.innerHTML = '<span class="dname">'+d+'</span><span class="dept-bar-track"><span class="dept-bar-fill" style="width:'+(avg/5*100)+'%"></span></span><span class="dcount">'+avg.toFixed(1)+' / 5</span>';
    chart.appendChild(row);
  });
}

function renderGoalsList(){
  const t = currentTenant();
  const wrap = document.getElementById('goals-list');
  wrap.innerHTML = '';
  t.goals.forEach(g=>{
    const cls = g.status === 'At risk' ? 'status-leave' : (g.status === 'Completed' ? 'status-active' : 'status-active');
    const assignee = g.assignedTo ? findEmployee(g.assignedTo) : null;
    const assigneeTag = assignee ? '<span class="cc-notes-badge" style="margin:0;">'+assignee.name+'</span>' : '<span class="cc-notes-badge" style="margin:0;">Company-wide</span>';
    const row = document.createElement('div');
    row.className = 'goal-row';
    row.innerHTML =
      '<div class="gh"><span><span class="gtitle">'+g.title+'</span><span class="gmeta">'+g.department+' · Due '+formatDate(g.dueDate)+' · '+assigneeTag+'</span></span>'+
      '<span class="status-pill '+cls+'"><span class="dot"></span>'+g.status+'</span></div>'+
      '<div class="gbar-row"><span class="dept-bar-track" style="flex:1;"><span class="dept-bar-fill" style="width:'+g.progress+'%"></span></span><span class="gpct">'+g.progress+'%</span>'+
      (g.status !== 'Completed' ? '<button class="btn btn-quiet" data-bump-goal="'+g.id+'" style="padding:4px 9px; font-size:11px;">+10%</button>' : '')+
      '</div>';
    wrap.appendChild(row);
  });
  const onTrack = t.goals.filter(g=>g.status !== 'At risk').length;
  document.getElementById('goals-hint').textContent = onTrack + ' of ' + t.goals.length + ' on track or completed';

  wrap.querySelectorAll('[data-bump-goal]').forEach(btn=>{
    btn.addEventListener('click', ()=> bumpGoalProgress(btn.dataset.bumpGoal));
  });
}

function bumpGoalProgress(goalId){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const g = t.goals.find(x=>x.id===goalId);
  if(!g) return;
  g.progress = Math.min(100, g.progress + 10);
  if(g.progress >= 100){ g.progress = 100; g.status = 'Completed'; }
  else if(g.status === 'At risk' && g.progress >= 50){ g.status = 'On track'; }
  logActivity(t, 'Progress updated on "' + g.title + '" to ' + g.progress + '%');
  renderGoalsList();
  renderPerfKpis();
  persistState();
  showToast('"' + g.title + '" is now ' + g.progress + '% complete');
}

function openGoalModal(){
  const t = currentTenant();
  const deptSel = document.getElementById('g-dept');
  deptSel.innerHTML = t.departments.map(d=>'<option>'+d+'</option>').join('');
  const assigneeSel = document.getElementById('g-assignee');
  assigneeSel.innerHTML = '<option value="">Company-wide</option>' + t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('g-title').value = '';
  const due = new Date(); due.setMonth(due.getMonth() + 3);
  document.getElementById('g-due').value = due.toISOString().slice(0,10);
  document.getElementById('goal-modal-overlay').classList.add('open');
  setTimeout(()=> document.getElementById('g-title').focus(), 50);
}
function closeGoalModal(){ document.getElementById('goal-modal-overlay').classList.remove('open'); }

function submitGoal(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const title = document.getElementById('g-title').value.trim();
  const department = document.getElementById('g-dept').value;
  const assignedTo = document.getElementById('g-assignee').value || null;
  const dueDate = document.getElementById('g-due').value;
  if(!title || !dueDate){
    showToast('Add a title and due date to continue');
    return;
  }
  const newId = 'GL-' + t.key.toUpperCase() + '-' + (t.goals.length + 1) + '-' + Date.now().toString().slice(-4);
  const goal = { id:newId, title, department, progress:0, status:'On track', dueDate, assignedTo };
  t.goals.push(goal);
  logActivity(t, 'New goal added: ' + title);
  if(assignedTo){
    const e = findEmployee(assignedTo);
    if(e) logEmployeeHistory(e, 'Assigned a new goal: ' + title);
  }
  closeGoalModal();
  renderGoalsList();
  renderPerfKpis();
  persistState();
  showToast('Goal added');
}

function renderPerfKpis(){
  const t = currentTenant();
  const reviews = Object.values(t.reviews);
  const completed = reviews.filter(r=>r.status==='Completed');
  const avgRating = completed.length ? (completed.reduce((s,r)=>s+r.rating,0)/completed.length) : 0;
  const goalsOnTrack = Math.round((t.goals.filter(g=>g.status!=='At risk').length / t.goals.length) * 100);
  const kpis = [
    { label:'Reviews due this month', value:String(t.reviewsThisMonth), delta:'Across all departments' },
    { label:'Reviews completed', value: completed.length + ' of ' + reviews.length, delta:'This cycle' },
    { label:'Average rating', value: completed.length ? avgRating.toFixed(1) + ' / 5' : '—', delta:'From completed reviews' },
    { label:'Goals on track', value: goalsOnTrack + '%', delta: t.goals.length + ' active goals' }
  ];
  const row = document.getElementById('perf-kpi-row');
  row.innerHTML = '';
  kpis.forEach(k=>{
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = '<div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div>';
    row.appendChild(card);
  });
}

function nextCycleLabel(label){
  const m = /^Q(\d) (\d{4})$/.exec(label);
  if(!m) return 'Q1 ' + (new Date().getFullYear() + 1);
  let q = Number(m[1]), y = Number(m[2]);
  q += 1;
  if(q > 4){ q = 1; y += 1; }
  return 'Q' + q + ' ' + y;
}

function startNewReviewCycle(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const completed = Object.values(t.reviews).filter(r=>r.status==='Completed');
  const avgRating = completed.length ? (completed.reduce((s,r)=>s+r.rating,0)/completed.length).toFixed(1) : '—';
  if(!t.cycleHistory) t.cycleHistory = [];
  t.cycleHistory.unshift({ cycle:t.currentCycle, completed:completed.length, total:Object.keys(t.reviews).length, avgRating });
  t.currentCycle = nextCycleLabel(t.currentCycle);
  setupReviewsForTenant(t);
  logActivity(t, 'Started a new review cycle: ' + t.currentCycle);
  renderPerformancePage();
  persistState();
  showToast('New review cycle started: ' + t.currentCycle);
}

function renderPerformancePage(){
  const t = currentTenant();
  document.getElementById('perf-sub').textContent = t.shortName + ' · current review cycle and team goals';
  document.getElementById('review-cycle-title').textContent = 'Review cycle · ' + t.currentCycle;
  renderPerfKpis();
  renderReviewList();
  renderRatingChart();
  renderGoalsList();
}

/* ===================================================================== REPORTS */

function renderBarRows(containerId, pairs, formatValue){
  const el = document.getElementById(containerId);
  if(!el) return;
  if(!pairs || pairs.length === 0){ el.innerHTML = '<div class="empty-inline">No data yet.</div>'; return; }
  const max = Math.max(...pairs.map(p=>Number(p[1])||0), 1);
  const barW = 36, gap = 14, padL = 8, padR = 8, padT = 16, padB = 54, chartH = 140;
  const totalW = pairs.length * (barW + gap) - gap + padL + padR;
  const accent = currentTenant().accent;
  let bars = '', labels = '', values = '';
  pairs.forEach(([label, value], i)=>{
    const x = padL + i * (barW + gap);
    const barH = Math.max(2, Math.round((Number(value)||0) / max * chartH));
    const y = padT + chartH - barH;
    const display = formatValue ? formatValue(Number(value)||0) : String(value);
    bars += '<rect class="svg-bar" x="'+x+'" y="'+y+'" width="'+barW+'" height="'+barH+'" rx="4" fill="'+accent+'" opacity="0.85"/>';
    const labelX = x + barW/2;
    const shortLabel = label.length > 10 ? label.slice(0,9)+'…' : label;
    labels += '<text class="svg-label" x="'+labelX+'" y="'+(padT+chartH+18)+'" text-anchor="middle">'+shortLabel+'</text>';
    const shortVal = display.length > 8 ? display.slice(0,7)+'…' : display;
    values += '<text class="svg-value-label" x="'+labelX+'" y="'+(y-4)+'" text-anchor="middle">'+shortVal+'</text>';
  });
  const svgH = padT + chartH + padB;
  el.innerHTML = '<div class="svg-chart"><svg width="'+totalW+'" height="'+svgH+'" viewBox="0 0 '+totalW+' '+svgH+'">'+bars+values+labels+'</svg></div>';
}

function renderStatRow(containerId, items){
  document.getElementById(containerId).innerHTML = items.map(it=>
    '<div class="stat-mini"><div class="sm-label">'+it.label+'</div><div class="sm-value">'+it.value+'</div></div>'
  ).join('');
}

function lastSixMonthLabels(){
  const labels = [];
  const base = new Date(); base.setDate(1);
  for(let i=5;i>=0;i--){
    const dt = new Date(base.getFullYear(), base.getMonth()-i, 1);
    labels.push(dt.toLocaleDateString('en-GB', { month:'short' }));
  }
  return labels;
}

function renderReportBody(){
  const t = currentTenant();
  const body = document.getElementById('report-body');
  const from = state.reportDateFrom ? dateOnly(state.reportDateFrom) : null;
  const to = state.reportDateTo ? dateOnly(state.reportDateTo) : null;
  const inRange = (iso)=>{
    if(!iso) return true;
    const d = dateOnly(iso);
    if(from && d < from) return false;
    if(to && d > to) return false;
    return true;
  };

  body.innerHTML =
    '<div class="stat-mini-row" id="report-stats"></div>'+
    '<div class="report-panels">'+
      '<div class="panel"><div class="panel-head"><h3 id="report-chart-a-title"></h3></div><div id="report-chart-a"></div></div>'+
      '<div class="panel"><div class="panel-head"><h3 id="report-chart-b-title"></h3></div><div id="report-chart-b"></div></div>'+
    '</div>';

  if(state.reportTab === 'workforce'){
    document.getElementById('report-chart-a-title').textContent = 'Headcount by department';
    document.getElementById('report-chart-b-title').textContent = 'Hires in date range';
    const filtered = t.employees.filter(e=> inRange(e.hireDate));
    const active = filtered.filter(e=>e.status==='Active').length;
    const onLeave = filtered.filter(e=>e.status==='On leave').length;
    const probation = filtered.filter(e=>e.status==='Probation').length;
    renderStatRow('report-stats', [
      { label:'People'+(from||to?' in range':''), value:filtered.length },
      { label:'Active', value:active },
      { label:'On leave', value:onLeave },
      { label:'Probation', value:probation }
    ]);
    const deptCounts = {};
    t.departments.forEach(d=> deptCounts[d] = 0);
    filtered.forEach(e=> deptCounts[e.department] = (deptCounts[e.department]||0) + 1);
    renderBarRows('report-chart-a', Object.entries(deptCounts).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]));
    const labels = lastSixMonthLabels();
    renderBarRows('report-chart-b', labels.map((l,i)=>[l, t.hireTrend[i]]));
  }

  else if(state.reportTab === 'attendance'){
    document.getElementById('report-chart-a-title').textContent = "Today's attendance";
    document.getElementById('report-chart-b-title').textContent = 'Leave by type';
    let onTime = 0, late = 0, absent = 0;
    const onLeaveToday = t.employees.filter(e=>e.status==='On leave').length;
    t.employees.forEach(e=>{
      if(e.status === 'On leave') return;
      const a = attendanceFor(e.id);
      if(a.status === 'Late') late++;
      else if(a.status === 'Absent') absent++;
      else onTime++;
    });
    const filteredReqs = t.leaveRequests.filter(r=> inRange(r.startDate));
    renderStatRow('report-stats', [
      { label:'On time today', value:onTime },
      { label:'Late', value:late },
      { label:'Absent', value:absent },
      { label:'On leave', value:onLeaveToday }
    ]);
    renderBarRows('report-chart-a', [['On time',onTime],['Late',late],['Absent',absent],['On leave',onLeaveToday]]);
    const typeCounts = {};
    filteredReqs.forEach(r=>{ typeCounts[r.type] = (typeCounts[r.type]||0) + 1; });
    renderBarRows('report-chart-b', Object.entries(typeCounts).length ? Object.entries(typeCounts) : [['No data',0]]);
  }

  else if(state.reportTab === 'recruitment'){
    document.getElementById('report-chart-a-title').textContent = 'Candidates by stage';
    document.getElementById('report-chart-b-title').textContent = 'Applicants by role';
    const filteredCandidates = t.candidates.filter(c=> inRange(c.appliedDate));
    const openRoles = t.openings.filter(o=>o.status==='Open').length;
    const active = filteredCandidates.filter(c=>c.stage!=='Hired'&&c.stage!=='Rejected').length;
    renderStatRow('report-stats', [
      { label:'Open roles', value:openRoles },
      { label:'Candidates'+(from||to?' in range':''), value:filteredCandidates.length },
      { label:'Avg. time to hire', value:t.avgTimeToHireDays+' days' },
      { label:'Active pipeline', value:active }
    ]);
    renderBarRows('report-chart-a', STAGE_ORDER.map(s=>[s, filteredCandidates.filter(c=>c.stage===s).length]));
    renderBarRows('report-chart-b', t.openings.map(o=>[o.title, o.applicants]));
  }

  else if(state.reportTab === 'payroll'){
    document.getElementById('report-chart-a-title').textContent = 'Cost by department';
    document.getElementById('report-chart-b-title').textContent = 'Run history (net pay)';
    const totalGross = t.employees.reduce((s,e)=>s+e.salary,0);
    const totalPaye = t.employees.reduce((s,e)=>s+payeFor(e.salary),0);
    const totalNet = t.employees.reduce((s,e)=>s+netPayForEmployee(e),0);
    renderStatRow('report-stats', [
      { label:'Total gross', value:formatUGX(totalGross) },
      { label:'Total PAYE', value:formatUGX(totalPaye) },
      { label:'Net payout', value:formatUGX(totalNet) },
      { label:'People on payroll', value:t.employees.length }
    ]);
    const deptTotals = {};
    t.departments.forEach(d=> deptTotals[d] = 0);
    t.employees.forEach(e=> deptTotals[e.department] = (deptTotals[e.department]||0) + e.salary);
    renderBarRows('report-chart-a', Object.entries(deptTotals).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]), formatUGX);
    const history = (t.payrollHistory||[]).filter(h=> inRange(h.date)).slice(0,6).reverse();
    renderBarRows('report-chart-b', history.length ? history.map(h=>[formatDate(h.date).slice(0,6), h.totalNet]) : [['No runs yet',0]], formatUGX);
  }

  else if(state.reportTab === 'performance'){
    document.getElementById('report-chart-a-title').textContent = 'Avg. rating by department';
    document.getElementById('report-chart-b-title').textContent = 'Goals by status';
    const reviews = Object.values(t.reviews);
    const completed = reviews.filter(r=>r.status==='Completed');
    const avgRating = completed.length ? (completed.reduce((s,r)=>s+r.rating,0)/completed.length) : 0;
    const goalsOnTrack = t.goals.length ? Math.round((t.goals.filter(g=>g.status!=='At risk').length/t.goals.length)*100) : 0;
    renderStatRow('report-stats', [
      { label:'Reviews completed', value: completed.length+' of '+reviews.length },
      { label:'Average rating', value: completed.length ? avgRating.toFixed(1)+'/5' : '—' },
      { label:'Goals on track', value: goalsOnTrack+'%' },
      { label:'Cycle', value: t.currentCycle }
    ]);
    const sums={}, counts={};
    t.departments.forEach(d=>{ sums[d]=0; counts[d]=0; });
    t.employees.forEach(e=>{
      const r = t.reviews[e.id];
      if(r && r.status==='Completed'){ sums[e.department]+=r.rating; counts[e.department]++; }
    });
    const ratingPairs = t.departments.filter(d=>counts[d]>0).map(d=>[d, +(sums[d]/counts[d]).toFixed(1)]);
    renderBarRows('report-chart-a', ratingPairs.length ? ratingPairs : [['No data',0]]);
    const statusCounts={};
    t.goals.forEach(g=> statusCounts[g.status]=(statusCounts[g.status]||0)+1);
    renderBarRows('report-chart-b', Object.entries(statusCounts).length ? Object.entries(statusCounts) : [['No data',0]]);
  }
}

function renderReportTabs(){
  document.querySelectorAll('#report-tabs .chip').forEach(chip=>{
    chip.classList.toggle('active', chip.dataset.tab === state.reportTab);
    chip.onclick = ()=>{
      state.reportTab = chip.dataset.tab;
      renderReportTabs();
      renderReportBody();
    };
  });
}

function renderReportsPage(){
  const t = currentTenant();
  document.getElementById('reports-sub').textContent = t.shortName + ' · cross-module analytics';
  const fromEl = document.getElementById('report-date-from');
  const toEl = document.getElementById('report-date-to');
  if(fromEl) fromEl.value = state.reportDateFrom;
  if(toEl) toEl.value = state.reportDateTo;
  renderReportTabs();
  renderReportBody();
  const savedEl = document.getElementById('saved-reports-list');
  if(savedEl){
    savedEl.innerHTML = renderSavedReports();
    savedEl.querySelectorAll('[data-load-report]').forEach(btn=>{
      btn.addEventListener('click', ()=> loadSavedReport(btn.dataset.loadReport));
    });
  }
}

function csvEscape(val){
  const s = String(val);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}

function downloadCSV(filename, rows){
  const csv = rows.map(r=> r.map(csvEscape).join(',')).join('\r\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportReportCSV(){
  const t = currentTenant();
  const tag = t.key + '-' + state.reportTab;
  let rows = [];
  let filename = state.reportTab + '-' + tag + '.csv';

  if(state.reportTab === 'workforce'){
    rows.push(['Name','Title','Department','Status','Hire date','Employee ID']);
    t.employees.forEach(e=> rows.push([e.name, e.title, e.department, e.status, e.hireDate, e.id]));
  } else if(state.reportTab === 'attendance'){
    rows.push(['Name','Department','Clock in','Clock out','Status']);
    t.employees.forEach(e=>{
      if(e.status === 'On leave'){ rows.push([e.name, e.department, '—', '—', 'On leave']); }
      else { const a = attendanceFor(e.id); rows.push([e.name, e.department, a.clockIn, a.clockOut, a.status]); }
    });
  } else if(state.reportTab === 'recruitment'){
    rows.push(['Candidate','Role','Stage','Applied date']);
    t.candidates.forEach(c=> rows.push([c.name, c.role, c.stage, c.appliedDate]));
  } else if(state.reportTab === 'payroll'){
    rows.push(['Name','Department','Gross salary','PAYE','NSSF employee','Net pay']);
    t.employees.forEach(e=>{
      const paye = payeFor(e.salary), nssf = nssfEmployeeFor(e.salary);
      rows.push([e.name, e.department, e.salary, paye, nssf, e.salary - paye - nssf]);
    });
  } else if(state.reportTab === 'performance'){
    rows.push(['Name','Department','Review status','Rating','Due date']);
    t.employees.forEach(e=>{
      const r = t.reviews[e.id];
      rows.push([e.name, e.department, r ? r.status : '', r && r.rating ? r.rating : '', r ? r.dueDate : '']);
    });
  }

  downloadCSV(filename, rows);
  showToast('Exported ' + filename);
}

function exportReportPDF(){
  const t = currentTenant();
  const tab = state.reportTab;
  const fromLabel = state.reportDateFrom ? ' from ' + formatDate(state.reportDateFrom) : '';
  const toLabel = state.reportDateTo ? ' to ' + formatDate(state.reportDateTo) : '';
  const stats = document.getElementById('report-stats');
  const chartA = document.getElementById('report-chart-a');
  const chartB = document.getElementById('report-chart-b');
  const titleA = document.getElementById('report-chart-a-title');
  const titleB = document.getElementById('report-chart-b-title');
  const html =
    '<h2 style="color:'+t.accent+';">'+t.shortName+'</h2>'+
    '<div class="offer-meta">'+tab.charAt(0).toUpperCase()+tab.slice(1)+' Report'+fromLabel+toLabel+' · Generated '+new Date().toLocaleDateString('en-GB')+'</div>'+
    '<div style="margin:18px 0;">'+stats.outerHTML+'</div>'+
    '<h3 style="font-size:14px; margin-bottom:8px;">'+titleA.textContent+'</h3>'+chartA.innerHTML+
    '<h3 style="font-size:14px; margin:18px 0 8px;">'+titleB.textContent+'</h3>'+chartB.innerHTML;
  document.getElementById('print-area').innerHTML = html;
  window.print();
}

/* ===================================================================== SETTINGS */

function shadeColor(hex, percent){
  const num = parseInt(hex.replace('#',''), 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00FF) + Math.round(2.55 * percent);
  let b = (num & 0x0000FF) + Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1).toUpperCase();
}

function renderGeneralTab(){
  const t = currentTenant();
  const tz = t.timezone || 'East Africa Time (UTC+3)';
  const lang = t.language || 'English (UK)';
  const body = document.getElementById('settings-body');
  body.innerHTML =
    '<div class="panel">'+
      '<div class="settings-section-title">Organization profile</div>'+
      '<div class="field-grid">'+
        '<div class="field"><label for="set-org-name">Organization name</label><input type="text" id="set-org-name" value="'+t.shortName+'"></div>'+
        '<div class="field"><label for="set-org-domain">Domain</label><input type="text" id="set-org-domain" value="'+t.domain+'" disabled></div>'+
        '<div class="field full"><label for="set-brand-color">Brand color</label>'+
          '<div class="color-field-row"><input type="color" id="set-brand-color" value="'+t.accent+'"><input type="text" id="set-brand-color-text" value="'+t.accent+'" disabled></div>'+
        '</div>'+
        '<div class="field"><label for="set-timezone">Time zone</label><select id="set-timezone">'+
          ['East Africa Time (UTC+3)','Central Africa Time (UTC+2)','West Africa Time (UTC+1)'].map(o=>'<option'+(tz===o?' selected':'')+'>'+o+'</option>').join('')+
        '</select></div>'+
        '<div class="field"><label for="set-language">Language</label><select id="set-language">'+
          ['English (UK)','Luganda','Swahili'].map(o=>'<option'+(lang===o?' selected':'')+'>'+o+'</option>').join('')+
        '</select></div>'+
      '</div>'+
      '<div style="margin-top:18px; display:flex; justify-content:flex-end;">'+
        '<button class="btn btn-primary" id="save-general-btn">Save changes</button>'+
      '</div>'+
    '</div>'+
    '<div class="panel" style="margin-top:16px;">'+
      '<div class="settings-section-title">Data</div>'+
      '<div class="toggle-row" style="border-bottom:none;">'+
        '<span><span class="tr-label">Reset to sample data</span><span class="tr-desc">Clears every change you have made and restores the original demo data for all three organizations.</span></span>'+
        '<button class="btn btn-danger-text" id="reset-data-btn">Reset</button>'+
      '</div>'+
      '<div class="toggle-row" style="border-bottom:none; margin-top:4px;">'+
        '<span><span class="tr-label">Sign out</span><span class="tr-desc">Return to the login screen.</span></span>'+
        '<button class="btn btn-quiet" id="signout-btn">Sign out</button>'+
      '</div>'+
      '</div>'+
    '</div>';

  document.getElementById('set-brand-color').addEventListener('input', (ev)=>{
    document.getElementById('set-brand-color-text').value = ev.target.value.toUpperCase();
  });
  document.getElementById('save-general-btn').addEventListener('click', saveGeneralSettings);
  document.getElementById('reset-data-btn').addEventListener('click', resetAllData);
  document.getElementById('signout-btn').addEventListener('click', ()=>{
    document.getElementById('shell').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-hint').textContent = '';
    document.getElementById('login-mark').style.background = currentTenant().accent;
  });
}

function saveGeneralSettings(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const name = document.getElementById('set-org-name').value.trim();
  const color = document.getElementById('set-brand-color').value;
  const timezone = document.getElementById('set-timezone').value;
  const language = document.getElementById('set-language').value;
  if(!name){ showToast("Organization name can't be empty"); return; }
  t.shortName = name;
  t.accent = color;
  t.accentStrong = shadeColor(color, -25);
  t.accentSoft = shadeColor(color, 82);
  t.timezone = timezone;
  t.language = language;
  applyTenantTheme(t);
  renderTenantMenu();
  document.getElementById('settings-sub').textContent = t.shortName + ' · organization, team, billing and security';
  logActivity(t, 'Organization settings were updated');
  persistState();
  showToast('Settings saved for ' + t.shortName);
}

function renderTeamTab(){
  const t = currentTenant();
  const body = document.getElementById('settings-body');
  let rows = t.team.map(member=>{
    const e = findEmployee(member.employeeId);
    if(!e) return '';
    const cls = member.role === 'Owner' ? 'role-badge owner' : 'role-badge';
    return '<div class="team-row"><span class="avatar">'+initials(e.name)+'</span>'+
      '<span class="tmeta"><span class="tname">'+e.name+'</span><br><span class="temail">'+emailFor(e.name, t)+'</span></span>'+
      '<span class="'+cls+'">'+member.role+'</span></div>';
  }).join('');
  rows += t.invites.map((inv,idx)=>
    '<div class="team-row"><span class="avatar">'+inv.email.charAt(0).toUpperCase()+'</span>'+
    '<span class="tmeta"><span class="tname">'+inv.email+'</span><br><span class="temail">Invited as '+inv.role+'</span></span>'+
    '<span class="role-badge invited">Invited</span>'+
    '<button class="cancel-invite" data-cancel-invite="'+idx+'">Cancel</button></div>'
  ).join('');

  body.innerHTML =
    '<div class="panel" style="margin-bottom:16px;">'+
      '<div class="settings-section-title">Preview as role</div>'+
      '<p style="font-size:12px; color:var(--ink-faint); margin-bottom:12px;">See what the app looks like for a different permission level. This only changes what you can click in this preview — it is not real account security.</p>'+
      '<div class="field" style="max-width:240px;">'+
        '<select id="preview-role-select">'+
          ['Owner','Admin','Billing admin','Viewer'].map(r=>'<option'+(state.viewingAsRole===r?' selected':'')+'>'+r+'</option>').join('')+
        '</select>'+
      '</div>'+
    '</div>'+
    '<div class="panel">'+
      '<div class="panel-head"><h3>Workspace members</h3>'+
      '<button class="btn btn-primary" id="invite-teammate-btn" style="padding:7px 13px; font-size:12px;">Invite teammate</button></div>'+
      rows +
    '</div>';

  document.getElementById('preview-role-select').addEventListener('change', (ev)=>{
    state.viewingAsRole = ev.target.value;
    showToast(state.viewingAsRole === 'Viewer' ? "Now previewing as Viewer — most actions are blocked" : 'Now previewing as ' + state.viewingAsRole);
  });
  document.getElementById('invite-teammate-btn').addEventListener('click', openInviteModal);
  body.querySelectorAll('[data-cancel-invite]').forEach(btn=>{
    btn.addEventListener('click', ()=> cancelInvite(Number(btn.dataset.cancelInvite)));
  });
}

function cancelInvite(idx){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const removed = t.invites.splice(idx,1)[0];
  renderTeamTab();
  persistState();
  if(removed) showToast('Invite to ' + removed.email + ' was canceled');
}

function openInviteModal(){
  document.getElementById('inv-email').value = '';
  document.getElementById('inv-role').value = 'Admin';
  document.getElementById('invite-modal-overlay').classList.add('open');
  setTimeout(()=> document.getElementById('inv-email').focus(), 50);
}
function closeInviteModal(){ document.getElementById('invite-modal-overlay').classList.remove('open'); }

function submitInvite(){
  if(blockIfReadOnly()) return;
  const email = document.getElementById('inv-email').value.trim();
  const role = document.getElementById('inv-role').value;
  if(!email || !email.includes('@')){
    showToast('Enter a valid work email to continue');
    return;
  }
  const t = currentTenant();
  t.invites.push({ email, role });
  logActivity(t, 'Invited ' + email + ' as ' + role);
  closeInviteModal();
  renderTeamTab();
  persistState();
  showToast('Invite sent to ' + email);
}

function renderBillingTab(){
  const t = currentTenant();
  const seatsUsed = t.team.length;
  const body = document.getElementById('settings-body');
  const plans = [
    { name:'Starter', price:'UGX 220,000 / month', features:['Up to 25 employees','Core HR modules','Email support'] },
    { name:'Growth', price:'UGX ' + t.billing.priceUGX.toLocaleString('en-US') + ' / month', features:['Up to ' + t.billing.seatsLimit + ' admin seats','All HR modules','Priority support'] },
    { name:'Enterprise', price:'Custom pricing', features:['Unlimited seats','Dedicated success manager','Custom integrations'] }
  ];
  const planCards = plans.map(p=>{
    const isCurrent = p.name === 'Growth';
    return '<div class="plan-card'+(isCurrent?' current':'')+'">'+
      (isCurrent ? '<div class="pc-current-tag">Current plan</div>' : '')+
      '<div class="pc-name">'+p.name+'</div><div class="pc-price">'+p.price+'</div>'+
      '<ul>'+p.features.map(f=>'<li>· '+f+'</li>').join('')+'</ul>'+
      (isCurrent ? '' : '<button class="btn" data-choose-plan="'+p.name+'" style="margin-top:10px; width:100%;">Choose '+p.name+'</button>')+
    '</div>';
  }).join('');

  const storagePct = Math.round((t.billing.storageUsedGB / t.billing.storageLimitGB) * 100);
  const seatsPct = Math.round((seatsUsed / t.billing.seatsLimit) * 100);

  body.innerHTML =
    '<div class="plan-grid">'+planCards+'</div>'+
    '<div class="panel">'+
      '<div class="settings-section-title">Usage</div>'+
      '<div class="usage-bar-row"><div class="ub-label"><span>Admin seats</span><span>'+seatsUsed+' of '+t.billing.seatsLimit+'</span></div><div class="ub-track"><div class="ub-fill" style="width:'+seatsPct+'%"></div></div></div>'+
      '<div class="usage-bar-row"><div class="ub-label"><span>Storage</span><span>'+t.billing.storageUsedGB+' GB of '+t.billing.storageLimitGB+' GB</span></div><div class="ub-track"><div class="ub-fill" style="width:'+storagePct+'%"></div></div></div>'+
      '<div style="font-size:12px; color:var(--ink-faint); margin-top:4px;">Next billing date: '+formatDate(t.billing.nextBillingDate)+'</div>'+
    '</div>';

  body.querySelectorAll('[data-choose-plan]').forEach(btn=>{
    btn.addEventListener('click', ()=> showToast('Plan changes are part of the next build phase'));
  });
}

function toggleRowHtml(key, label, desc, checked){
  return '<div class="toggle-row"><span><span class="tr-label">'+label+'</span><span class="tr-desc">'+desc+'</span></span>'+
    '<label class="switch"><input type="checkbox" data-key="'+key+'" '+(checked?'checked':'')+'><span class="slider"></span></label></div>';
}

function renderSecurityTab(){
  const t = currentTenant();
  const body = document.getElementById('settings-body');
  body.innerHTML =
    '<div class="panel" style="margin-bottom:16px;">'+
      '<div class="settings-section-title">Authentication</div>'+
      toggleRowHtml('mfaRequired','Require multi-factor authentication','Everyone must verify sign-in with a second device.', t.security.mfaRequired)+
      toggleRowHtml('ssoEnabled','Single sign-on (SSO)','Let people sign in with their organization identity provider.', t.security.ssoEnabled)+
      toggleRowHtml('ipRestricted','Restrict access by IP address','Only allow sign-in from approved office networks.', t.security.ipRestricted)+
    '</div>'+
    '<div class="panel">'+
      '<div class="settings-section-title">Recent security activity</div>'+
      '<ul class="activity-list" id="audit-log-list"></ul>'+
    '</div>';

  body.querySelectorAll('.switch input').forEach(input=>{
    input.addEventListener('change', ()=> toggleSecurity(input.dataset.key));
  });
  renderAuditLog();
}

function toggleSecurity(key){
  if(isReadOnlyPreview()){
    blockIfReadOnly();
    renderSecurityTab();
    return;
  }
  const t = currentTenant();
  t.security[key] = !t.security[key];
  const labels = { mfaRequired:'Multi-factor authentication', ssoEnabled:'Single sign-on', ipRestricted:'IP address restriction' };
  t.auditLog.unshift({ text: labels[key] + ' was turned ' + (t.security[key] ? 'on' : 'off'), when:'Just now' });
  logActivity(t, labels[key] + ' was turned ' + (t.security[key] ? 'on' : 'off'));
  renderAuditLog();
  persistState();
  showToast(labels[key] + ' turned ' + (t.security[key] ? 'on' : 'off'));
}

function renderAuditLog(){
  const t = currentTenant();
  const list = document.getElementById('audit-log-list');
  list.innerHTML = t.auditLog.map(a=>
    '<li><span class="dot"></span><span class="txt">'+a.text+'<span class="when">'+a.when+'</span></span></li>'
  ).join('');
}

function renderSettingsBody(){
  if(state.settingsTab === 'general') renderGeneralTab();
  else if(state.settingsTab === 'team') renderTeamTab();
  else if(state.settingsTab === 'billing') renderBillingTab();
  else if(state.settingsTab === 'security') renderSecurityTab();
  else if(state.settingsTab === 'api') renderApiTab();
}

function generateApiKey(prefix){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let key = prefix + '_';
  for(let i=0;i<32;i++) key += chars[Math.floor(Math.random()*chars.length)];
  return key;
}

function renderApiTab(){
  const t = currentTenant();
  if(!t.apiKeys) t.apiKeys = [
    { id:'key1', label:'Production integration', scope:'Read-only', key: generateApiKey('vhr_ro'), created:'2026-01-15' },
    { id:'key2', label:'HR dashboard connector', scope:'Full access', key: generateApiKey('vhr_fa'), created:'2026-03-02' }
  ];
  if(!t.webhooks) t.webhooks = [
    { id:'wh1', url:'https://hooks.zapier.com/hooks/catch/12345/abcde/', events:'Employee created, Employee updated', active:true },
    { id:'wh2', url:'https://api.slack.com/incoming-webhooks/T0000/B0000/XXXX', events:'Leave approved', active:true }
  ];
  const body = document.getElementById('settings-body');
  const keyRows = t.apiKeys.map(k=>
    '<div class="api-key-row">'+
      '<div><div class="ak-label">'+k.label+'</div><div class="ak-scope">'+k.scope+' · Created '+formatDate(k.created)+'</div></div>'+
      '<code id="apikey-'+k.id+'">'+k.key.slice(0,8)+'••••••••••••••••••••••••</code>'+
      '<button class="btn btn-quiet" data-reveal="'+k.id+'" style="font-size:11.5px; padding:6px 10px;">Reveal</button>'+
      '<button class="btn btn-danger-text" data-revoke="'+k.id+'" style="font-size:11.5px; padding:6px 10px;">Revoke</button>'+
    '</div>'
  ).join('');
  const webhookRows = t.webhooks.map(w=>
    '<div class="webhook-row">'+
      '<div class="wh-url">'+w.url+'</div>'+
      '<div class="wh-meta">Events: '+w.events+' · '+(w.active?'<span style="color:var(--accent-strong);">Active</span>':'Inactive')+'</div>'+
    '</div>'
  ).join('');

  body.innerHTML =
    '<div class="panel" style="margin-bottom:16px;">'+
      '<div class="panel-head"><h3 class="settings-section-title" style="margin:0;">API Keys</h3><button class="btn btn-primary" id="gen-api-key-btn" style="font-size:12px; padding:7px 13px;">Generate key</button></div>'+
      '<p style="font-size:12px; color:var(--ink-faint); margin:0 0 14px;">Use API keys to authenticate requests to the Vantage HR API. Keep them secret — treat them like passwords.</p>'+
      keyRows +
    '</div>'+
    '<div class="panel" style="margin-bottom:16px;">'+
      '<div class="panel-head"><h3 class="settings-section-title" style="margin:0;">Webhooks</h3><button class="btn" id="add-webhook-btn" style="font-size:12px; padding:7px 13px;">Add endpoint</button></div>'+
      '<p style="font-size:12px; color:var(--ink-faint); margin:0 0 14px;">Vantage HR will send a POST request to these URLs whenever the subscribed events occur.</p>'+
      webhookRows +
    '</div>'+
    '<div class="panel">'+
      '<div class="settings-section-title">REST API base URL</div>'+
      '<code style="font-family:var(--font-mono); font-size:12px; background:var(--paper-sunken); padding:10px 14px; border-radius:var(--r-md); display:block; color:var(--ink-soft);">https://api.vantage-hr.com/v1/orgs/'+t.key+'</code>'+
      '<p style="font-size:12px; color:var(--ink-faint); margin:10px 0 0;">Full API documentation would be at <strong>docs.vantage-hr.com</strong> in production.</p>'+
    '</div>';

  document.getElementById('gen-api-key-btn').addEventListener('click', ()=>{
    if(blockIfReadOnly()) return;
    const label = prompt('Name this API key:');
    if(!label) return;
    const scopeChoice = confirm('Grant full access?\nOK = Full access  ·  Cancel = Read-only');
    t.apiKeys.unshift({ id:'key'+Date.now(), label, scope: scopeChoice?'Full access':'Read-only', key: generateApiKey(scopeChoice?'vhr_fa':'vhr_ro'), created:new Date().toISOString().slice(0,10) });
    logActivity(t, 'New API key created: ' + label);
    persistState();
    renderApiTab();
    showToast('API key created for ' + label);
  });
  document.getElementById('add-webhook-btn').addEventListener('click', ()=>{
    if(blockIfReadOnly()) return;
    const url = prompt('Webhook endpoint URL:');
    if(!url || !url.startsWith('http')) return;
    t.webhooks.push({ id:'wh'+Date.now(), url, events:'Employee created', active:true });
    persistState();
    renderApiTab();
    showToast('Webhook endpoint added');
  });
  body.querySelectorAll('[data-reveal]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const k = t.apiKeys.find(k=>k.id===btn.dataset.reveal);
      if(!k) return;
      const el = document.getElementById('apikey-'+k.id);
      if(el.textContent.includes('•')){ el.textContent = k.key; btn.textContent = 'Hide'; }
      else { el.textContent = k.key.slice(0,8)+'••••••••••••••••••••••••'; btn.textContent = 'Reveal'; }
    });
  });
  body.querySelectorAll('[data-revoke]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(blockIfReadOnly()) return;
      if(!confirm('Revoke this API key? Any integration using it will stop working immediately.')) return;
      const idx = t.apiKeys.findIndex(k=>k.id===btn.dataset.revoke);
      if(idx !== -1){
        const [removed] = t.apiKeys.splice(idx,1);
        logActivity(t, 'API key revoked: ' + removed.label);
        persistState();
        renderApiTab();
        showToast('Key revoked');
      }
    });
  });
}

function renderSettingsTabs(){
  document.querySelectorAll('#settings-tabs .chip').forEach(chip=>{
    chip.classList.toggle('active', chip.dataset.tab === state.settingsTab);
    chip.onclick = ()=>{
      state.settingsTab = chip.dataset.tab;
      renderSettingsTabs();
      renderSettingsBody();
    };
  });
}

function renderSettingsPage(){
  const t = currentTenant();
  document.getElementById('settings-sub').textContent = t.shortName + ' · organization, team, billing and security';
  renderSettingsTabs();
  renderSettingsBody();
}

/* ===================================================================== ORG CHART */

function buildOrgTree(t){
  const byId = {};
  t.employees.forEach(e=> byId[e.id] = { ...e, children:[] });
  const roots = [];
  t.employees.forEach(e=>{
    const managerId = t.managerOf ? t.managerOf[e.id] : null;
    if(managerId && byId[managerId]){
      byId[managerId].children.push(byId[e.id]);
    } else {
      roots.push(byId[e.id]);
    }
  });
  return roots;
}

function renderOrgNode(node, t){
  const ava = '<div class="on-avatar">'+initials(node.name)+'</div>';
  const cls = 'org-node' + (!t.managerOf || !Object.values(t.managerOf).includes(node.id) ? '' : '');
  const rootCls = !t.managerOf || t.managerOf[node.id] === null ? ' root-node' : '';
  return '<div class="'+cls+rootCls+'" data-org-emp="'+node.id+'">'+ava+'<div class="on-name">'+node.name.replace('Dr. ','')+'</div><div class="on-title">'+node.title+'</div></div>';
}

function renderOrgLevel(nodes, t){
  if(!nodes || nodes.length === 0) return '';
  let html = '<div class="org-level">';
  nodes.forEach(n=>{
    html += '<div class="org-branch">';
    html += renderOrgNode(n, t);
    if(n.children && n.children.length > 0){
      html += '<div class="org-branch-line"></div>';
      html += renderOrgLevel(n.children, t);
    }
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function renderOrgChart(){
  const t = currentTenant();
  document.getElementById('orgchart-sub').textContent = t.shortName + ' · ' + t.employees.length + ' people';
  const deptSel = document.getElementById('orgchart-dept-filter');
  if(deptSel.options.length <= 1){
    t.departments.forEach(d=>{ const opt = document.createElement('option'); opt.value=d; opt.textContent=d; deptSel.appendChild(opt); });
  }
  deptSel.value = state.orgChartDeptFilter;
  let employees = t.employees;
  if(state.orgChartDeptFilter) employees = employees.filter(e=>e.department === state.orgChartDeptFilter);
  const filteredT = { ...t, employees, managerOf: t.managerOf };
  const roots = buildOrgTree(filteredT);
  const wrap = document.getElementById('org-chart-wrap');
  wrap.innerHTML = roots.length === 0
    ? '<div class="empty-inline">No employees match this filter.</div>'
    : renderOrgLevel(roots, filteredT);
  wrap.querySelectorAll('[data-org-emp]').forEach(node=>{
    node.addEventListener('click', ()=> openDrawer(node.dataset.orgEmp));
  });
}

/* ===================================================================== NOTIFICATIONS */

function seedNotifications(t){
  if(t.notifications) return;
  t.notifications = [
    { id:'n1', text:'Patricia Nantongo approved Grace Atim\'s leave request', when:'Today 9:14 AM', type:'Leave', read:false },
    { id:'n2', text:'Florence Namutebi completed her 90-day check-in', when:'Yesterday', type:'Onboarding', read:false },
    { id:'n3', text:'Performance review cycle closes in 6 days', when:'Yesterday', type:'Performance', read:true },
    { id:'n4', text:'Hellen Auma starts Monday on the front desk', when:'2 days ago', type:'Hiring', read:true },
    { id:'n5', text:'Sandra Nabirye\'s leave request is awaiting approval', when:'3 days ago', type:'Leave', read:true }
  ];
}

function renderNotifications(){
  const t = currentTenant();
  seedNotifications(t);
  const unread = t.notifications.filter(n=>!n.read).length;
  document.getElementById('notif-sub').textContent = unread ? unread + ' unread' : 'All caught up';
  const badge = document.getElementById('nav-notif-badge');
  if(badge) badge.style.display = unread ? 'inline-block' : 'none';
  const list = document.getElementById('notif-list');
  if(t.notifications.length === 0){
    list.innerHTML = '<div class="notif-empty">No notifications yet. Actions across the platform will appear here.</div>';
    return;
  }
  list.innerHTML = t.notifications.map(n=>
    '<div class="notif-item'+(n.read?'':' unread')+'" data-notif-id="'+n.id+'">'+
    '<span class="notif-dot"></span>'+
    '<span class="notif-body"><span class="nb-text">'+n.text+'</span><span class="nb-when">'+n.when+'</span></span>'+
    '<span class="notif-type-tag">'+n.type+'</span>'+
    '</div>'
  ).join('');
  list.querySelectorAll('[data-notif-id]').forEach(item=>{
    item.addEventListener('click', ()=>{
      const n = t.notifications.find(x=>x.id===item.dataset.notifId);
      if(n && !n.read){ n.read=true; renderNotifications(); persistState(); }
    });
  });
}

function markAllNotificationsRead(){
  const t = currentTenant();
  seedNotifications(t);
  t.notifications.forEach(n=>n.read=true);
  renderNotifications();
  persistState();
  showToast('All notifications marked as read');
}

function pushNotification(text, type){
  const t = currentTenant();
  seedNotifications(t);
  t.notifications.unshift({ id:'n'+Date.now(), text, when:'Just now', type:type||'System', read:false });
  renderNotifications();
}

/* ===================================================================== LEAVE POLICY */

function renderLeavePolicyBtn(){
  const wrap = document.getElementById('leave-kpi-row');
  if(!wrap) return;
  let btn = document.getElementById('leave-policy-btn');
  if(!btn){
    const container = wrap.closest('.page') || document.getElementById('page-leave');
    if(!container) return;
    const pageHeader = container.querySelector('.page-header');
    if(!pageHeader) return;
    const existing = pageHeader.querySelector('#leave-policy-btn');
    if(existing) return;
    btn = document.createElement('button');
    btn.id = 'leave-policy-btn';
    btn.className = 'btn';
    btn.textContent = 'Leave policy';
    btn.addEventListener('click', openPolicyModal);
    pageHeader.appendChild(btn);
  }
}

function openPolicyModal(){
  const t = currentTenant();
  const p = t.leavePolicy;
  document.getElementById('pol-annual').value = p.annual;
  document.getElementById('pol-sick').value = p.sick;
  document.getElementById('pol-compassionate').value = p.compassionate;
  document.getElementById('pol-maternity').value = p.maternity;
  document.getElementById('pol-carryover').value = p.carryover;
  document.getElementById('pol-notice').value = p.noticeDays;
  document.getElementById('pol-blackout').value = (p.blackout||[]).join(', ');
  document.getElementById('policy-modal-overlay').classList.add('open');
}
function closePolicyModal(){ document.getElementById('policy-modal-overlay').classList.remove('open'); }

function submitPolicy(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  t.leavePolicy.annual = Number(document.getElementById('pol-annual').value)||21;
  t.leavePolicy.sick = Number(document.getElementById('pol-sick').value)||10;
  t.leavePolicy.compassionate = Number(document.getElementById('pol-compassionate').value)||4;
  t.leavePolicy.maternity = Number(document.getElementById('pol-maternity').value)||60;
  t.leavePolicy.carryover = Number(document.getElementById('pol-carryover').value)||5;
  t.leavePolicy.noticeDays = Number(document.getElementById('pol-notice').value)||3;
  t.leavePolicy.blackout = document.getElementById('pol-blackout').value.split(',').map(s=>s.trim()).filter(Boolean);
  closePolicyModal();
  logActivity(t, 'Leave policy updated');
  persistState();
  showToast('Leave policy saved');
}

/* ===================================================================== SHIFTS */

const SHIFT_COLORS = { Morning:'#2E7D32', Day:'#1565C0', Afternoon:'#E65100', Night:'#4A148C', Off:'' };

function getShiftWeekStart(){
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - d.getDay() + 1 + (state.shiftWeekOffset * 7));
  return d;
}

function renderShifts(){
  const t = currentTenant();
  if(!t.shifts) t.shifts = {};
  const weekStart = getShiftWeekStart();
  const days = Array.from({length:7}, (_,i)=>{ const d=new Date(weekStart); d.setDate(d.getDate()+i); return d; });
  document.getElementById('shifts-sub').textContent = t.shortName + ' · shift scheduling';
  document.getElementById('shifts-week-label').textContent = days[0].toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ' – ' + days[6].toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});

  const deptSel = document.getElementById('shifts-dept-filter');
  if(deptSel.options.length === 0){
    deptSel.innerHTML = '<option value="">All departments</option>' + t.departments.map(d=>'<option value="'+d+'">'+d+'</option>').join('');
  }
  const deptFilter = deptSel.value;
  const employees = deptFilter ? t.employees.filter(e=>e.department===deptFilter) : t.employees;

  const kpiRow = document.getElementById('shifts-kpi-row');
  let scheduled=0, dayOff=0, unassigned=0;
  employees.forEach(e=>{
    days.forEach(d=>{
      const key = e.id+'_'+d.toISOString().slice(0,10);
      const shift = t.shifts[key];
      if(!shift) unassigned++;
      else if(shift==='Off') dayOff++;
      else scheduled++;
    });
  });
  kpiRow.innerHTML = [
    {label:'Scheduled shifts', value:scheduled},
    {label:'Days off', value:dayOff},
    {label:'Unassigned', value:unassigned},
    {label:'People this week', value:employees.length}
  ].map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div></div>').join('');

  let gridHtml = '<div class="shift-grid" style="grid-template-columns:140px repeat(7,1fr);">';
  gridHtml += '<div class="sg-head">Name</div>';
  days.forEach(d=>{ gridHtml += '<div class="sg-head">'+(d.getDate()===(new Date()).getDate()&&d.getMonth()===(new Date()).getMonth()?'<strong>':'')+d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric'})+(d.getDate()===(new Date()).getDate()&&d.getMonth()===(new Date()).getMonth()?'</strong>':'')+'</div>'; });
  employees.forEach(e=>{
    gridHtml += '<div class="sg-name"><span class="avatar" style="width:22px;height:22px;font-size:9px;">'+initials(e.name)+'</span>'+e.name.split(' ')[0]+'</div>';
    days.forEach(d=>{
      const key = e.id+'_'+d.toISOString().slice(0,10);
      const shift = t.shifts[key];
      const label = shift || '+';
      const tagCls = shift === 'Off' ? ' off' : (shift ? '' : '');
      const bg = shift && shift!=='Off' ? 'style="background:'+SHIFT_COLORS[shift]+'"' : '';
      gridHtml += '<div class="shift-cell" data-shift-key="'+key+'" data-emp-name="'+e.name.split(' ')[0]+'" data-day-label="'+d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})+'"><span class="shift-tag'+tagCls+'" '+bg+'>'+label+'</span></div>';
    });
  });
  gridHtml += '</div>';
  document.getElementById('shift-grid-wrap').innerHTML = gridHtml;
  document.getElementById('shift-grid-wrap').querySelectorAll('[data-shift-key]').forEach(cell=>{
    cell.addEventListener('click', ()=>{
      state.shiftAssignContext = { key:cell.dataset.shiftKey, empName:cell.dataset.empName, dayLabel:cell.dataset.dayLabel };
      openShiftModal();
    });
  });

  document.getElementById('shift-legend').innerHTML = Object.entries(SHIFT_COLORS).map(([name,col])=>
    '<span style="display:inline-flex;align-items:center;gap:5px;margin:4px 10px 4px 0;font-size:12px;"><span style="width:12px;height:12px;border-radius:3px;background:'+(col||'var(--paper-sunken)')+';display:inline-block;border:1px solid var(--border);"></span>'+name+'</span>'
  ).join('');
}

function openShiftModal(){
  const ctx = state.shiftAssignContext;
  if(!ctx) return;
  document.getElementById('shift-modal-context').textContent = ctx.empName + ' · ' + ctx.dayLabel;
  const existing = currentTenant().shifts[ctx.key] || 'Day';
  document.getElementById('shift-type-select').value = existing;
  document.getElementById('shift-modal-overlay').classList.add('open');
}
function closeShiftModal(){ document.getElementById('shift-modal-overlay').classList.remove('open'); }

function submitShift(){
  if(blockIfReadOnly()) return;
  const ctx = state.shiftAssignContext;
  if(!ctx) return;
  const val = document.getElementById('shift-type-select').value;
  currentTenant().shifts[ctx.key] = val;
  closeShiftModal();
  renderShifts();
  persistState();
  showToast(ctx.empName + ' assigned ' + val + ' on ' + ctx.dayLabel);
}

function publishShifts(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  logActivity(t, 'Shift schedule published for the week');
  pushNotification('This week\'s shift schedule has been published', 'Scheduling');
  persistState();
  showToast('Shift schedule published — team notified');
}

/* ===================================================================== SCORECARD */

const SCORECARD_CRITERIA = ['Communication','Technical skills','Culture fit','Problem solving','Motivation'];

function openScorecardModal(candidateId){
  const c = findCandidate(candidateId);
  if(!c) return;
  state.scorecardCandidateId = candidateId;
  state.scorecardRatings = c.scorecard ? {...c.scorecard.ratings} : {};
  document.getElementById('scorecard-modal-title').textContent = 'Scorecard — ' + c.name;
  document.getElementById('scorecard-candidate-name').textContent = c.role + ' · ' + c.stage;
  renderScorecardCriteria();
  document.getElementById('scorecard-notes').value = c.scorecard ? c.scorecard.notes||'' : '';
  document.getElementById('scorecard-modal-overlay').classList.add('open');
}
function closeScorecardModal(){ document.getElementById('scorecard-modal-overlay').classList.remove('open'); }

function renderScorecardCriteria(){
  const el = document.getElementById('scorecard-criteria');
  el.innerHTML = SCORECARD_CRITERIA.map(crit=>{
    const rating = state.scorecardRatings[crit] || 0;
    const stars = [1,2,3,4,5].map(n=>
      '<button class="'+(n<=rating?'lit':'')+'" data-crit="'+crit+'" data-val="'+n+'" aria-label="'+n+' star">★</button>'
    ).join('');
    return '<div class="scorecard-criterion"><div class="sc-label">'+crit+'</div><div class="sc-stars">'+stars+'</div></div>';
  }).join('');
  el.querySelectorAll('.sc-stars button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      state.scorecardRatings[btn.dataset.crit] = Number(btn.dataset.val);
      renderScorecardCriteria();
      updateScorecardOverall();
    });
  });
  updateScorecardOverall();
}

function updateScorecardOverall(){
  const ratings = Object.values(state.scorecardRatings);
  if(ratings.length === 0){ document.getElementById('scorecard-overall-display').textContent = ''; return; }
  const avg = (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1);
  document.getElementById('scorecard-overall-display').textContent = 'Overall score: '+avg+' / 5 across '+ratings.length+' criteria';
}

function submitScorecard(){
  if(blockIfReadOnly()) return;
  const c = findCandidate(state.scorecardCandidateId);
  if(!c) return;
  c.scorecard = { ratings: {...state.scorecardRatings}, notes: document.getElementById('scorecard-notes').value.trim() };
  const ratings = Object.values(c.scorecard.ratings);
  const avg = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : '—';
  if(!c.notes) c.notes = [];
  c.notes.unshift({ text:'Scorecard completed · avg '+avg+'/5', when: new Date().toLocaleDateString('en-GB') });
  closeScorecardModal();
  renderKanban();
  persistState();
  showToast('Scorecard saved for ' + c.name + ' · avg '+avg+'/5');
}

/* ===================================================================== SAVED REPORTS */

function saveCurrentReport(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const name = prompt('Name this saved report:');
  if(!name) return;
  if(!t.savedReports) t.savedReports = [];
  t.savedReports.unshift({
    id:'sr'+Date.now(), name,
    tab:state.reportTab, dateFrom:state.reportDateFrom, dateTo:state.reportDateTo,
    savedAt:new Date().toLocaleDateString('en-GB')
  });
  persistState();
  showToast('"' + name + '" saved');
}

function renderSavedReports(){
  const t = currentTenant();
  const saved = t.savedReports || [];
  return saved.length === 0
    ? '<div class="empty-inline">No saved reports yet. Save one using the button above.</div>'
    : saved.map(r=>
      '<div class="saved-report-row"><span class="sr-name">'+r.name+'</span><span class="sr-meta">'+r.tab+(r.dateFrom?' · '+r.dateFrom:'')+(r.dateTo?' → '+r.dateTo:'')+'</span><button class="btn btn-quiet" data-load-report="'+r.id+'" style="font-size:11.5px;padding:6px 10px;">Load</button></div>'
    ).join('');
}

function loadSavedReport(id){
  const t = currentTenant();
  const r = (t.savedReports||[]).find(x=>x.id===id);
  if(!r) return;
  state.reportTab = r.tab;
  state.reportDateFrom = r.dateFrom||'';
  state.reportDateTo = r.dateTo||'';
  renderReportsPage();
  showToast('Loaded "'+r.name+'"');
}

/* ===================================================================== MULTI-CURRENCY */

const CURRENCIES = [
  {code:'UGX', symbol:'UGX ', rate:1},
  {code:'KES', symbol:'KES ', rate:0.033},
  {code:'USD', symbol:'$ ', rate:0.00026},
  {code:'GBP', symbol:'£ ', rate:0.00020},
  {code:'EUR', symbol:'€ ', rate:0.000235}
];

function renderCurrencySwitcher(){
  let el = document.getElementById('currency-switcher');
  if(el) return;
  const topbar = document.querySelector('.topbar-right');
  if(!topbar) return;
  el = document.createElement('select');
  el.id = 'currency-switcher';
  el.className = 'btn';
  el.style.cssText = 'font-size:12px;padding:7px 10px;cursor:pointer;';
  el.setAttribute('aria-label','Currency');
  CURRENCIES.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.code;
    el.appendChild(opt);
  });
  el.value = currentTenant().currency || 'UGX';
  el.addEventListener('change', ()=>{
    currentTenant().currency = el.value;
    renderPayrollPage();
    renderSalaryTable();
    showToast('Currency switched to ' + el.value);
  });
  topbar.insertBefore(el, topbar.firstChild);
}

function formatCurrency(amountUGX){
  const t = currentTenant();
  const cur = CURRENCIES.find(c=>c.code===(t.currency||'UGX')) || CURRENCIES[0];
  const val = amountUGX * cur.rate;
  if(val >= 1000000) return cur.symbol + (val/1000000).toFixed(2) + 'M';
  if(val >= 1000) return cur.symbol + (val/1000).toFixed(1) + 'K';
  return cur.symbol + Math.round(val).toLocaleString('en-US');
}

/* ===================================================================== DRAWER */

function openDrawer(id){
  const e = findEmployee(id);
  if(!e) return;
  state.drawerId = id;
  document.getElementById('drawer-avatar').textContent = initials(e.name);
  document.getElementById('drawer-name').textContent = e.name;
  document.getElementById('drawer-title').textContent = e.title + ' · ' + e.department;
  document.getElementById('ov-dept').textContent = e.department;
  document.getElementById('ov-status').innerHTML = statusPillHtml(e.status);
  document.getElementById('ov-id').textContent = e.id;
  document.getElementById('ov-hire').textContent = formatDate(e.hireDate);
  document.getElementById('ov-email').textContent = emailFor(e.name, currentTenant());
  document.getElementById('ov-phone').textContent = phoneFor(e.id);

  const leave = leaveFor(e.id);
  const pane = document.getElementById('pane-timeoff');
  pane.innerHTML = ['annual','sick','compassionate'].map(key=>{
    const l = leave[key];
    const pct = Math.min(100, Math.round((l.used/l.total)*100));
    const label = key.charAt(0).toUpperCase()+key.slice(1)+' leave';
    return '<div class="leave-block"><div class="lh"><span class="lname">'+label+'</span><span class="lnum">'+l.used+' of '+l.total+' days used</span></div><div class="leave-track"><div class="leave-fill" style="width:'+pct+'%"></div></div></div>';
  }).join('');

  const docsPane = document.getElementById('pane-documents');
  docsPane.innerHTML = DOC_TEMPLATES.map((doc,i)=>{
    const d = new Date(e.hireDate);
    d.setDate(d.getDate() + (i+1)*2);
    return '<div class="doc-row"><span class="dico"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4"/></svg></span><span class="dmeta"><span class="dname">'+doc+'</span><br><span class="ddate">Uploaded '+formatDate(d.toISOString().slice(0,10))+'</span></span></div>';
  }).join('');

  const t = currentTenant();
  const goalsPane = document.getElementById('pane-goals');
  const myGoals = t.goals.filter(g=>g.assignedTo === e.id);
  goalsPane.innerHTML = myGoals.length === 0
    ? '<div class="empty-inline">No goals assigned directly to '+e.name.split(' ')[0]+' yet. Add one from the Performance page.</div>'
    : myGoals.map(g=>{
        const cls = g.status === 'At risk' ? 'status-leave' : 'status-active';
        return '<div class="goal-row"><div class="gh"><span><span class="gtitle">'+g.title+'</span><span class="gmeta">Due '+formatDate(g.dueDate)+'</span></span>'+
          '<span class="status-pill '+cls+'"><span class="dot"></span>'+g.status+'</span></div>'+
          '<div class="gbar-row"><span class="dept-bar-track" style="flex:1;"><span class="dept-bar-fill" style="width:'+g.progress+'%"></span></span><span class="gpct">'+g.progress+'%</span></div></div>';
      }).join('');

  const historyPane = document.getElementById('pane-history');
  const history = e.history || [];
  historyPane.innerHTML = history.length === 0
    ? '<div class="empty-inline">No changes recorded yet.</div>'
    : history.map(h=> '<li style="list-style:none;"><span class="dot"></span><span class="txt">'+h.text+'<span class="when">'+h.when+'</span></span></li>').join('');
  if(history.length > 0) historyPane.innerHTML = '<ul class="activity-list">' + historyPane.innerHTML + '</ul>';

  document.querySelectorAll('.drawer-tab').forEach(tab=> tab.classList.toggle('active', tab.dataset.tab==='overview'));
  document.querySelectorAll('.drawer-pane').forEach(p=> p.classList.toggle('active', p.id==='pane-overview'));

  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
}

function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  state.drawerId = null;
}

/* ===================================================================== ADD EMPLOYEE MODAL */

function openAddModal(employeeId){
  const t = currentTenant();
  state.editingEmployeeId = employeeId || null;
  const sel = document.getElementById('f-dept');
  sel.innerHTML = t.departments.map(d=>'<option>'+d+'</option>').join('');

  if(employeeId){
    const e = findEmployee(employeeId);
    if(!e) return;
    document.getElementById('modal-title').textContent = 'Edit employee';
    document.getElementById('modal-submit').textContent = 'Save changes';
    document.getElementById('f-name').value = e.name;
    document.getElementById('f-title').value = e.title;
    sel.value = e.department;
    document.getElementById('f-status').value = e.status;
    document.getElementById('f-start').value = e.hireDate;
    document.getElementById('f-salary').value = e.salary;
  } else {
    document.getElementById('modal-title').textContent = 'Add an employee';
    document.getElementById('modal-submit').textContent = 'Add employee';
    document.getElementById('f-name').value = '';
    document.getElementById('f-title').value = '';
    document.getElementById('f-status').value = 'Active';
    document.getElementById('f-start').value = new Date().toISOString().slice(0,10);
    document.getElementById('f-salary').value = '';
  }
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(()=> document.getElementById('f-name').focus(), 50);
}
function closeAddModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  state.editingEmployeeId = null;
}

function submitAddEmployee(){
  if(blockIfReadOnly()) return;
  const name = document.getElementById('f-name').value.trim();
  const title = document.getElementById('f-title').value.trim();
  const department = document.getElementById('f-dept').value;
  const status = document.getElementById('f-status').value;
  const start = document.getElementById('f-start').value;
  const salaryRaw = document.getElementById('f-salary').value;
  const salary = salaryRaw ? Number(salaryRaw) : 1200000;

  if(!name || !title || !start){
    showToast('Add a name, title, and start date to continue');
    return;
  }
  const t = currentTenant();

  if(state.editingEmployeeId){
    const e = findEmployee(state.editingEmployeeId);
    if(!e){ closeAddModal(); return; }
    const changes = [];
    if(e.title !== title) changes.push('title to ' + title);
    if(e.department !== department) changes.push('department to ' + department);
    if(e.status !== status) changes.push('status to ' + status);
    if(e.salary !== salary) changes.push('salary to ' + formatUGX(salary));
    Object.assign(e, { name, title, department, status, hireDate:start, salary });
    if(changes.length){
      logEmployeeHistory(e, 'Updated ' + changes.join(', '));
      logActivity(t, e.name + "'s record was updated");
    }
    closeAddModal();
    renderEmployeeTable();
    renderDeptChips();
    renderDashboard();
    renderLeavePage();
    renderPayrollPage();
    renderPerformancePage();
    if(state.drawerId === e.id) openDrawer(e.id);
    persistState();
    showToast(name + ' was updated');
    return;
  }

  const newId = t.key.toUpperCase() + '-' + String(1000 + t.employees.length).slice(-4);
  const newEmployee = { name, title, department, status, hireDate:start, id:newId, salary, history:[] };
  t.employees.push(newEmployee);
  const due = new Date(); due.setDate(due.getDate() + 30);
  t.reviews[newId] = { status:'Not started', rating:null, dueDate: due.toISOString().slice(0,10) };
  logEmployeeHistory(newEmployee, 'Added to the directory');
  logActivity(t, name + ' joined as ' + title);
  pushNotification(name + ' was added as ' + title, 'People');
  closeAddModal();
  state.empLoaded = true;
  renderEmployeeTable();
  renderDeptChips();
  renderDashboard();
  renderLeavePage();
  renderPayrollPage();
  renderPerformancePage();
  persistState();
  showToast(name + ' was added to the directory');
}

/* ===================================================================== NAV / PAGES */

function goToPage(page){
  state.page = page;
  document.querySelectorAll('.nav-item').forEach(item=>{
    item.classList.toggle('active', item.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach(p=>{
    p.classList.toggle('visible', p.id === 'page-'+page);
  });
  if(window.innerWidth <= 880) closeSidebar();
}

function openSidebar(){ document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebar-overlay').classList.add('open'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-overlay').classList.remove('open'); }


/* ===================================================================== BENEFITS */

const BENEFIT_ICONS = { Health:'🏥', Insurance:'🛡️', Transport:'🚌', Housing:'🏠', Retirement:'🏦', Wellness:'💪', Education:'🎓' };

function renderBenefitsPage(){
  const t = currentTenant();
  document.getElementById('benefits-sub').textContent = t.shortName + ' · employee benefits and enrolments';
  const active = (t.benefits||[]).filter(b=>b.active).length;
  const totalValue = (t.benefits||[]).filter(b=>b.active).reduce((s,b)=>s+b.value,0);
  const enrolled = Object.keys(t.enrolments||{}).filter(k=>Object.keys(t.enrolments[k]||{}).length>0).length;
  const kpis = [
    { label:'Active benefits', value:String(active), delta:(t.benefits||[]).length+' total in catalogue' },
    { label:'Monthly benefit value', value:formatUGX(totalValue), delta:'Per employee avg' },
    { label:'Employees enrolled', value:String(enrolled)+' of '+t.employees.length, delta:'In at least one benefit' },
    { label:'Benefits catalogue', value:String((t.benefits||[]).length), delta:active+' active · '+(t.benefits.length-active)+' inactive' }
  ];
  const row = document.getElementById('benefits-kpi-row');
  row.innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  document.getElementById('benefits-catalog-hint').textContent = (t.benefits||[]).length + ' items';
  const catalog = document.getElementById('benefits-catalog-list');
  catalog.innerHTML = (t.benefits||[]).map(b=>{
    const icon = BENEFIT_ICONS[b.category] || '🎁';
    return '<div class="benefit-card">'+
      '<div class="benefit-icon">'+icon+'</div>'+
      '<div class="benefit-meta"><div class="bm-name">'+b.name+(b.active?'':' <span style="font-size:10.5px;color:var(--ink-faint);">(inactive)</span>')+'</div>'+
      '<div class="bm-desc">'+b.desc+'</div></div>'+
      '<div class="benefit-value">'+(b.value>0 ? formatUGX(b.value)+'/mo' : 'Statutory')+'</div>'+
      '<button class="enrol-pill" data-toggle-benefit="'+b.id+'">'+(!b.active?'Inactive':'Manage enrolment')+'</button>'+
      '</div>';
  }).join('') || '<div class="empty-inline">No benefits added yet. Add your first benefit above.</div>';
  catalog.querySelectorAll('[data-toggle-benefit]').forEach(btn=>{
    btn.addEventListener('click', ()=> showToast('Enrolment management opens in the Settings module in the next update'));
  });
  const tbody = document.getElementById('benefits-enrolment-tbody');
  tbody.innerHTML = t.employees.map(e=>{
    const enrolled = Object.values(e.benefits||{}).filter(Boolean);
    const enrolledNames = t.benefits ? t.benefits.filter(b=>enrolled.includes(b.id)).map(b=>b.name) : [];
    const totalVal = t.benefits ? t.benefits.filter(b=>enrolled.includes(b.id)).reduce((s,b)=>s+b.value,0) : 0;
    const autoEnrolled = t.benefits ? t.benefits.filter(b=>b.active).map(b=>b.name) : [];
    return '<tr><td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span class="name">'+e.name+'</span></div></td>'+
      '<td>'+e.department+'</td>'+
      '<td style="font-size:12px;">'+autoEnrolled.slice(0,2).join(', ')+(autoEnrolled.length>2?' +'+String(autoEnrolled.length-2)+' more':'')+'</td>'+
      '<td class="salary-cell">'+formatUGX(t.benefits.filter(b=>b.active).reduce((s,b)=>s+b.value,0))+'</td>'+
      '<td>'+statusPillHtml('Active')+'</td></tr>';
  }).join('');
}

function openBenefitModal(){ document.getElementById('benefit-modal-overlay').classList.add('open'); setTimeout(()=>document.getElementById('ben-name').focus(),50); }
function closeBenefitModal(){ document.getElementById('benefit-modal-overlay').classList.remove('open'); }
function submitBenefit(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const name = document.getElementById('ben-name').value.trim();
  const category = document.getElementById('ben-category').value;
  const value = Number(document.getElementById('ben-value').value)||0;
  const desc = document.getElementById('ben-desc').value.trim();
  if(!name){ showToast('Add a benefit name to continue'); return; }
  if(!t.benefits) t.benefits = [];
  t.benefits.push({ id:'BEN-'+t.key.toUpperCase()+'-'+Date.now(), name, category, emoji:BENEFIT_ICONS[category]||'🎁', value, desc, active:true });
  closeBenefitModal();
  logActivity(t, 'New benefit added: '+name);
  renderBenefitsPage();
  persistState();
  showToast(name+' added to the benefits catalogue');
}

/* ===================================================================== EXPENSES */

function renderExpensesPage(){
  const t = currentTenant();
  const exps = t.expenses || [];
  document.getElementById('expenses-sub').textContent = t.shortName + ' · expense claims and approvals';
  const pending = exps.filter(e=>e.status==='Pending');
  const approved = exps.filter(e=>e.status==='Approved');
  const totalApproved = approved.reduce((s,e)=>s+e.amount,0);
  const kpis = [
    { label:'Pending approval', value:String(pending.length), delta:'Awaiting your review' },
    { label:'Approved this month', value:String(approved.length), delta:formatUGX(totalApproved)+' total' },
    { label:'Total claims', value:String(exps.length), delta:'All statuses' },
    { label:'Avg. claim value', value:exps.length?formatUGX(exps.reduce((s,e)=>s+e.amount,0)/exps.length):'—', delta:'Across all claims' }
  ];
  const row = document.getElementById('expenses-kpi-row');
  row.innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  document.getElementById('expenses-pending-hint').textContent = pending.length+' claim'+(pending.length===1?'':'s')+' awaiting review';
  const pendingList = document.getElementById('expenses-pending-list');
  if(pending.length===0){ pendingList.innerHTML='<div class="empty-inline">No pending claims right now.</div>'; }
  else {
    pendingList.innerHTML = pending.map(exp=>{
      const e = findEmployee(exp.employeeId);
      return '<div class="expense-row"><span class="avatar">'+initials(e?e.name:'?')+'</span>'+
        '<span class="er-meta"><span class="er-name">'+(e?e.name:'Unknown')+'</span><span class="er-detail">'+exp.desc+'</span></span>'+
        '<span class="exp-category-tag">'+exp.category+'</span>'+
        '<span class="er-amount">'+formatUGX(exp.amount)+'</span>'+
        '<span class="er-actions">'+
          '<button class="btn er-reject" data-deny-exp="'+exp.id+'">Reject</button>'+
          '<button class="btn er-approve" data-approve-exp="'+exp.id+'">Approve</button>'+
        '</span></div>';
    }).join('');
    pendingList.querySelectorAll('[data-approve-exp]').forEach(btn=>btn.addEventListener('click',()=>decideExpense(btn.dataset.approveExp,'Approved')));
    pendingList.querySelectorAll('[data-deny-exp]').forEach(btn=>btn.addEventListener('click',()=>decideExpense(btn.dataset.denyExp,'Rejected')));
  }
  renderExpenseTable('All');
}

function decideExpense(id, decision){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const exp = t.expenses.find(e=>e.id===id);
  if(!exp) return;
  exp.status = decision;
  const e = findEmployee(exp.employeeId);
  logActivity(t, (e?e.name:'Employee')+' expense '+decision.toLowerCase()+': '+exp.desc);
  renderExpensesPage();
  persistState();
  showToast('Expense '+(decision==='Approved'?'approved':'rejected')+' for '+(e?e.name:'employee'));
}

let currentExpenseFilter = 'All';
function renderExpenseTable(status){
  if(status) currentExpenseFilter = status;
  const t = currentTenant();
  const exps = (t.expenses||[]).filter(e=> currentExpenseFilter==='All' || e.status===currentExpenseFilter);
  const tbody = document.getElementById('expenses-tbody');
  tbody.innerHTML = exps.map(exp=>{
    const e = findEmployee(exp.employeeId);
    const cls = exp.status==='Approved'?'status-active':exp.status==='Rejected'?'status-maintenance':'status-probation';
    return '<tr><td><div class="who-cell"><span class="avatar">'+initials(e?e.name:'?')+'</span><span class="name">'+(e?e.name:'Unknown')+'</span></div></td>'+
      '<td><span class="exp-category-tag">'+exp.category+'</span></td>'+
      '<td style="font-size:12.5px;">'+exp.desc+'</td>'+
      '<td class="salary-cell">'+formatUGX(exp.amount)+'</td>'+
      '<td style="font-size:12px;">'+formatDate(exp.date)+'</td>'+
      '<td><span class="status-pill '+cls+'"><span class="dot"></span>'+exp.status+'</span></td></tr>';
  }).join('') || '<tr><td colspan="6"><div class="empty-state"><div class="glyph">📭</div><h4>No claims yet</h4><p>Submitted expense claims will appear here.</p></div></td></tr>';
  document.querySelectorAll('#expense-status-chips .chip').forEach(c=>c.classList.toggle('active',c.dataset.expenseStatus===currentExpenseFilter));
}

function openExpenseModal(){
  const t = currentTenant();
  document.getElementById('exp-employee').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('exp-desc').value='';
  document.getElementById('exp-amount').value='';
  document.getElementById('exp-date').value=new Date().toISOString().slice(0,10);
  document.getElementById('expense-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('exp-desc').focus(),50);
}
function closeExpenseModal(){ document.getElementById('expense-modal-overlay').classList.remove('open'); }
function submitExpense(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const employeeId = document.getElementById('exp-employee').value;
  const category = document.getElementById('exp-category').value;
  const desc = document.getElementById('exp-desc').value.trim();
  const amount = Number(document.getElementById('exp-amount').value)||0;
  const date = document.getElementById('exp-date').value;
  if(!desc || !amount){ showToast('Add a description and amount to continue'); return; }
  const newId = 'EXP-'+t.key.toUpperCase()+'-'+Date.now();
  t.expenses.push({ id:newId, employeeId, category, desc, amount, date, status:'Pending' });
  closeExpenseModal();
  const e = findEmployee(employeeId);
  logActivity(t, (e?e.name:'Employee')+' submitted expense: '+desc);
  renderExpensesPage();
  persistState();
  showToast('Expense claim submitted — awaiting approval');
}

/* ===================================================================== ASSETS */

let currentAssetFilter = 'All';
let currentAssetSearch = '';
function renderAssetsPage(){
  const t = currentTenant();
  const assets = t.assets || [];
  document.getElementById('assets-sub').textContent = t.shortName + ' · '+assets.length+' assets registered';
  const inUse = assets.filter(a=>a.status==='In use').length;
  const available = assets.filter(a=>a.status==='Available').length;
  const maintenance = assets.filter(a=>a.status==='Maintenance').length;
  const totalValue = assets.reduce((s,a)=>s+a.value,0);
  const kpis = [
    { label:'Total assets', value:String(assets.length), delta:'Across all categories' },
    { label:'In use', value:String(inUse), delta:'Assigned to staff' },
    { label:'Available', value:String(available), delta:'Ready to assign' },
    { label:'Total asset value', value:formatUGX(totalValue), delta:'At purchase price' }
  ];
  const row = document.getElementById('assets-kpi-row');
  row.innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  const q = currentAssetSearch.toLowerCase();
  const filtered = assets.filter(a=>{
    if(currentAssetFilter!=='All' && a.status!==currentAssetFilter) return false;
    if(q && !(a.name+a.serial+a.category).toLowerCase().includes(q)) return false;
    return true;
  });
  const tbody = document.getElementById('assets-tbody');
  tbody.innerHTML = filtered.map(a=>{
    const assignee = a.assignedTo ? findEmployee(a.assignedTo) : null;
    const statusCls = a.status==='In use'?'status-active':a.status==='Available'?'status-available':'status-maintenance';
    return '<tr><td><div class="who-cell">'+
      '<span class="benefit-icon" style="width:28px;height:28px;font-size:14px;border-radius:6px;">'+getCategoryEmoji(a.category)+'</span>'+
      '<span><span class="name">'+a.name+'</span><br><span class="title">'+a.category+'</span></span></div></td>'+
      '<td>'+a.category+'</td>'+
      '<td><span class="asset-tag-badge">'+a.serial+'</span></td>'+
      '<td>'+(assignee?'<div class="who-cell"><span class="avatar" style="width:24px;height:24px;font-size:9px;">'+initials(assignee.name)+'</span><span>'+assignee.name+'</span></div>':'<span style="color:var(--ink-faint);font-size:12px;">Unassigned</span>')+'</td>'+
      '<td><span class="status-pill '+statusCls+'"><span class="dot"></span>'+a.status+'</span></td>'+
      '<td class="salary-cell">'+formatUGX(a.value)+'</td>'+
      '<td><button class="kebab-btn" data-asset-action="'+a.id+'" aria-label="Actions"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none"/></svg></button></td></tr>';
  }).join('') || '<tr><td colspan="7"><div class="empty-state"><div class="glyph">🖥️</div><h4>No assets match</h4><p>Try a different search or filter.</p></div></td></tr>';
  document.getElementById('asset-search').value = currentAssetSearch;
  document.querySelectorAll('#asset-status-chips .chip').forEach(c=>c.classList.toggle('active',c.dataset.assetStatus===currentAssetFilter));
  tbody.querySelectorAll('[data-asset-action]').forEach(btn=>{
    btn.addEventListener('click',()=> showToast('Asset editing and reassignment coming in the next update'));
  });
}

function getCategoryEmoji(cat){
  return {Computer:'💻', Phone:'📱', Vehicle:'🚗', Furniture:'🪑', 'Medical equipment':'🩺', Tools:'🔧', Other:'📦'}[cat]||'📦';
}

function openAssetModal(){
  const t = currentTenant();
  document.getElementById('ast-assign').innerHTML = '<option value="">Unassigned</option>'+t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('ast-name').value=''; document.getElementById('ast-serial').value=''; document.getElementById('ast-value').value='';
  document.getElementById('asset-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('ast-name').focus(),50);
}
function closeAssetModal(){ document.getElementById('asset-modal-overlay').classList.remove('open'); }
function submitAsset(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const name = document.getElementById('ast-name').value.trim();
  const category = document.getElementById('ast-category').value;
  const serial = document.getElementById('ast-serial').value.trim() || 'TAG-'+Date.now().toString().slice(-6);
  const value = Number(document.getElementById('ast-value').value)||0;
  const assignedTo = document.getElementById('ast-assign').value;
  if(!name){ showToast('Add an asset name to continue'); return; }
  if(!t.assets) t.assets = [];
  t.assets.push({ id:'AST-'+t.key.toUpperCase()+'-'+Date.now(), name, category, serial, assignedTo, status:assignedTo?'In use':'Available', value, purchaseDate:new Date().toISOString().slice(0,10) });
  closeAssetModal();
  logActivity(t, 'Asset registered: '+name);
  renderAssetsPage();
  persistState();
  showToast(name+' registered');
}

/* ===================================================================== LEARNING & DEVELOPMENT */

function renderLearningPage(){
  const t = currentTenant();
  const courses = t.courses || [];
  document.getElementById('learning-sub').textContent = t.shortName + ' · '+courses.length+' courses available';
  const mandatory = courses.filter(c=>c.mandatory).length;
  const totalEnrolments = courses.reduce((s,c)=>s+Object.keys(c.completions||{}).length,0);
  const completed = courses.reduce((s,c)=>s+Object.values(c.completions||{}).filter(v=>v==='completed').length,0);
  const rate = totalEnrolments>0 ? Math.round(completed/totalEnrolments*100) : 0;
  const kpis = [
    { label:'Courses available', value:String(courses.length), delta:mandatory+' mandatory' },
    { label:'Total enrolments', value:String(totalEnrolments), delta:'Across all courses' },
    { label:'Completions', value:String(completed), delta:rate+'% completion rate' },
    { label:'Hours of learning', value:String(courses.reduce((s,c)=>s+c.durationHrs,0))+'h', delta:'In the catalogue' }
  ];
  document.getElementById('learning-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  const categories = [...new Set(courses.map(c=>c.category))];
  const chips = document.getElementById('course-category-chips');
  if(!chips.children.length){
    ['All',...categories].forEach(cat=>{
      const btn = document.createElement('button');
      btn.className='chip'+(cat==='All'?' active':''); btn.textContent=cat; btn.dataset.courseCategory=cat;
      btn.addEventListener('click',()=>{ document.querySelectorAll('#course-category-chips .chip').forEach(c=>c.classList.toggle('active',c===btn)); renderCourseList(cat); });
      chips.appendChild(btn);
    });
  }
  renderCourseList('All');
  renderLearningProgress();
}

function renderCourseList(filterCat){
  const t = currentTenant();
  const courses = (t.courses||[]).filter(c=> filterCat==='All' || c.category===filterCat);
  const list = document.getElementById('course-list');
  list.innerHTML = courses.map(c=>{
    const enrolled = Object.keys(c.completions||{}).length;
    const done = Object.values(c.completions||{}).filter(v=>v==='completed').length;
    const pct = enrolled>0 ? Math.round(done/enrolled*100) : 0;
    const myStatus = c.completions[t.currentUser ? t.employees[0]?.id : '']||null;
    return '<div class="course-card">'+
      '<div class="course-icon" style="background:var(--accent-soft);">'+c.emoji+'</div>'+
      '<div class="course-meta">'+
        '<div class="cm-title">'+c.title+(c.mandatory?'<span class="course-mandatory">MANDATORY</span>':'')+'</div>'+
        '<div class="cm-detail">'+c.category+' · '+c.durationHrs+'h · Due '+formatDate(c.deadline)+'</div>'+
        '<div class="course-progress-bar"><div class="course-progress-fill" style="width:'+pct+'%"></div></div>'+
        '<div style="font-size:11px;color:var(--ink-faint);margin-top:4px;">'+done+' of '+t.employees.length+' completed</div>'+
      '</div>'+
      '<button class="enrol-course-btn'+(myStatus==='completed'?' completed':'')+(myStatus==='enrolled'?' enrolled':'')+'" data-course-id="'+c.id+'">'+
        (myStatus==='completed'?'✓ Completed':myStatus==='enrolled'?'In progress':'Enrol')+
      '</button></div>';
  }).join('') || '<div class="empty-inline">No courses in this category yet.</div>';
  list.querySelectorAll('[data-course-id]').forEach(btn=>{
    btn.addEventListener('click',()=> enrollInCourse(btn.dataset.courseId));
  });
}

function enrollInCourse(courseId){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const c = t.courses.find(x=>x.id===courseId);
  if(!c) return;
  const empId = t.employees[0]?.id;
  if(!empId) return;
  if(!c.completions) c.completions = {};
  if(c.completions[empId]==='completed'){
    showToast('Already completed this course'); return;
  }
  if(c.completions[empId]==='enrolled'){
    c.completions[empId]='completed';
    logActivity(t, 'Course completed: '+c.title);
    renderCourseList(document.querySelector('#course-category-chips .chip.active')?.dataset.courseCategory||'All');
    renderLearningProgress();
    persistState();
    showToast(c.title+' marked as completed');
  } else {
    c.completions[empId]='enrolled';
    logActivity(t, 'Enrolled in: '+c.title);
    renderCourseList(document.querySelector('#course-category-chips .chip.active')?.dataset.courseCategory||'All');
    persistState();
    showToast('Enrolled in '+c.title);
  }
}

function renderLearningProgress(){
  const t = currentTenant();
  const tbody = document.getElementById('learning-progress-tbody');
  const allCourses = t.courses || [];
  const completed_text = t.employees.map(e=>{
    const completed = allCourses.filter(c=>c.completions[e.id]==='completed').length;
    const inProg = allCourses.filter(c=>c.completions[e.id]==='enrolled').length;
    const rate = allCourses.length>0 ? Math.round(completed/allCourses.length*100) : 0;
    return '<tr><td><div class="who-cell"><span class="avatar">'+initials(e.name)+'</span><span class="name">'+e.name+'</span></div></td>'+
      '<td>'+e.department+'</td>'+
      '<td style="font-family:var(--font-mono);font-size:12.5px;color:var(--accent-strong);">'+completed+'</td>'+
      '<td style="font-family:var(--font-mono);font-size:12.5px;">'+inProg+'</td>'+
      '<td><div class="dept-bar-track"><div class="dept-bar-fill" style="width:'+rate+'%"></div></div><span style="font-size:11px;color:var(--ink-faint);margin-left:6px;">'+rate+'%</span></td></tr>';
  }).join('');
  tbody.innerHTML = completed_text;
  const totalCompleted = allCourses.reduce((s,c)=>s+Object.values(c.completions||{}).filter(v=>v==='completed').length,0);
  const possible = allCourses.length * t.employees.length;
  document.getElementById('learning-progress-hint').textContent = totalCompleted+' of '+possible+' possible completions';
}

function openCourseModal(){
  const due = new Date(); due.setMonth(due.getMonth()+3);
  document.getElementById('crs-title').value=''; document.getElementById('crs-duration').value='2'; document.getElementById('crs-deadline').value=due.toISOString().slice(0,10);
  document.getElementById('crs-mandatory').checked=false;
  document.getElementById('course-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('crs-title').focus(),50);
}
function closeCourseModal(){ document.getElementById('course-modal-overlay').classList.remove('open'); }
function submitCourse(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const title = document.getElementById('crs-title').value.trim();
  const category = document.getElementById('crs-category').value;
  const durationHrs = Number(document.getElementById('crs-duration').value)||1;
  const deadline = document.getElementById('crs-deadline').value;
  const mandatory = document.getElementById('crs-mandatory').checked;
  const emoji = {Compliance:'📋',Leadership:'🎯',Technical:'⚙️',Safety:'⛑️',Communication:'🗣️',Finance:'💵',Wellbeing:'🌿'}[category]||'📚';
  if(!title||!deadline){ showToast('Add a title and deadline to continue'); return; }
  if(!t.courses) t.courses=[];
  t.courses.push({ id:'CRS-'+t.key.toUpperCase()+'-'+Date.now(), title, category, emoji, durationHrs, mandatory, deadline, completions:{} });
  closeCourseModal();
  logActivity(t, 'New course added: '+title);
  renderLearningPage();
  persistState();
  showToast(title+' added to the catalogue');
}

/* ===================================================================== ENGAGEMENT & SURVEYS */

function renderEngagementPage(){
  const t = currentTenant();
  document.getElementById('engagement-sub').textContent = t.shortName + ' · surveys, pulse scores and recognition';
  const surveys = t.surveys || [];
  const avgScore = surveys.filter(s=>s.score!==null).reduce((a,s,_,arr)=>a+s.score/arr.length,0);
  const latestPulse = (t.pulseTrend||[]).slice(-1)[0] || 0;
  const recog = (t.recognition||[]).length;
  const kpis = [
    { label:'Active surveys', value:String(surveys.length), delta:'Running now' },
    { label:'Latest pulse score', value:latestPulse+'%', delta:latestPulse>=70?'Healthy ↑':'Needs attention ↓' },
    { label:'Avg. survey score', value:avgScore?Math.round(avgScore)+'%':'—', delta:'Completed surveys' },
    { label:'Recognitions given', value:String(recog), delta:'This month' }
  ];
  document.getElementById('engagement-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  const surveyList = document.getElementById('surveys-active-list');
  surveyList.innerHTML = surveys.length===0 ? '<div class="empty-inline">No active surveys. Launch one above.</div>'
    : surveys.map(s=>{
        const pct = Math.round(s.responses/s.total*100);
        return '<div class="survey-card">'+
          '<div class="sc-meta"><div class="sc-title">'+s.title+'</div>'+
          '<div class="sc-detail">'+s.type+' · Due '+formatDate(s.deadline)+(s.anonymous?' · Anonymous':'')+(s.score?' · Score: '+s.score+'%':'')+'</div>'+
          '<div class="sc-progress"><div class="dept-bar-track"><div class="dept-bar-fill" style="width:'+pct+'%"></div></div>'+
          '<div style="font-size:11px;color:var(--ink-faint);margin-top:3px;">'+s.responses+' of '+s.total+' responded</div></div></div>'+
          '<button class="btn btn-quiet" data-survey-results="'+s.id+'">View results</button>'+
          '</div>';
      }).join('');
  surveyList.querySelectorAll('[data-survey-results]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const s = (t.surveys||[]).find(x=>x.id===btn.dataset.surveyResults);
      if(s) showToast(s.title+' · '+s.responses+' responses · '+(s.score!==null?'Score: '+s.score+'%':'Awaiting enough responses'));
    });
  });
  renderPulseTrend();
  renderRecognitionWall();
}

function renderPulseTrend(){
  const t = currentTenant();
  const trend = t.pulseTrend || [0,0,0,0,0,0];
  const months = lastSixMonthLabels();
  const max = 100;
  const barW=36,gap=14,padL=8,padR=8,padT=16,padB=54,chartH=120;
  const totalW = trend.length*(barW+gap)-gap+padL+padR;
  const accent = t.accent;
  let bars='',labels='',values='';
  trend.forEach((v,i)=>{
    const x = padL+i*(barW+gap);
    const barH = Math.max(2,Math.round(v/max*chartH));
    const y = padT+chartH-barH;
    bars += '<rect class="svg-bar" x="'+x+'" y="'+y+'" width="'+barW+'" height="'+barH+'" rx="4" fill="'+accent+'" opacity="0.85"/>';
    labels += '<text class="svg-label" x="'+(x+barW/2)+'" y="'+(padT+chartH+18)+'" text-anchor="middle">'+months[i]+'</text>';
    values += '<text class="svg-value-label" x="'+(x+barW/2)+'" y="'+(y-4)+'" text-anchor="middle">'+v+'%</text>';
  });
  const svgH=padT+chartH+padB;
  document.getElementById('pulse-trend-chart').innerHTML = '<div class="svg-chart"><svg width="'+totalW+'" height="'+svgH+'" viewBox="0 0 '+totalW+' '+svgH+'">'+bars+values+labels+'</svg></div>';
}

function renderRecognitionWall(){
  const t = currentTenant();
  const recog = t.recognition || [];
  const list = document.getElementById('recognition-list');
  list.innerHTML = recog.length===0 ? '<div class="empty-inline">No recognitions yet. Be the first to give someone a shout-out.</div>'
    : recog.map(r=>{
        const giver = findEmployee(r.from);
        const receiver = findEmployee(r.to);
        return '<div class="recognition-post">'+
          '<div class="rp-avatar">'+initials(receiver?receiver.name:'?')+'</div>'+
          '<div class="rp-body">'+
            '<div class="rp-header"><span class="value-emoji">'+r.value.split(' ')[0]+'</span> <strong>'+(receiver?receiver.name:'Someone')+'</strong> was recognised by '+(giver?giver.name:'a colleague')+'</div>'+
            '<div class="rp-message">'+r.message+'</div>'+
            '<div class="rp-when">'+r.when+'</div>'+
          '</div></div>';
      }).join('');
}

function openSurveyModal(){
  const due = new Date(); due.setDate(due.getDate()+14);
  document.getElementById('srv-title').value=''; document.getElementById('srv-deadline').value=due.toISOString().slice(0,10);
  document.getElementById('srv-anon').checked=true;
  document.getElementById('survey-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('srv-title').focus(),50);
}
function closeSurveyModal(){ document.getElementById('survey-modal-overlay').classList.remove('open'); }
function submitSurvey(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const title = document.getElementById('srv-title').value.trim();
  const type = document.getElementById('srv-type').value;
  const deadline = document.getElementById('srv-deadline').value;
  const anonymous = document.getElementById('srv-anon').checked;
  if(!title||!deadline){ showToast('Add a title and deadline to continue'); return; }
  if(!t.surveys) t.surveys=[];
  t.surveys.push({ id:'SRV-'+t.key.toUpperCase()+'-'+Date.now(), title, type, deadline, anonymous, responses:0, total:t.employees.length, score:null });
  closeSurveyModal();
  logActivity(t, 'Survey launched: '+title);
  pushNotification(title+' survey is now live — please respond by '+formatDate(deadline), 'Survey');
  renderEngagementPage();
  persistState();
  showToast(title+' launched — '+t.employees.length+' people notified');
}

function openRecognitionModal(){
  const t = currentTenant();
  document.getElementById('rec-recipient').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('rec-message').value='';
  document.getElementById('recognition-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('rec-message').focus(),50);
}
function closeRecognitionModal(){ document.getElementById('recognition-modal-overlay').classList.remove('open'); }
function submitRecognition(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const toId = document.getElementById('rec-recipient').value;
  const value = document.getElementById('rec-value').value;
  const message = document.getElementById('rec-message').value.trim();
  if(!message){ showToast('Add a message to send your recognition'); return; }
  if(!t.recognition) t.recognition=[];
  const giver = t.employees[0];
  t.recognition.unshift({ id:'REC-'+t.key.toUpperCase()+'-'+Date.now(), from:giver?giver.id:'', to:toId, value, message, when:'Just now' });
  closeRecognitionModal();
  const receiver = findEmployee(toId);
  if(receiver) logEmployeeHistory(receiver, 'Received recognition: '+value.split(' ').slice(1).join(' '));
  logActivity(t, 'Recognition given to '+(receiver?receiver.name:'a team member'));
  pushNotification('🎉 '+(receiver?receiver.name:'Your team')+" received recognition for "+value.split(' ').slice(1).join(' '), 'Recognition');
  renderEngagementPage();
  persistState();
  showToast('Recognition sent to '+(receiver?receiver.name:'your team member'));
}




/* ===================================================================== SERVICE DESK */

let currentTicketFilter = 'All';
function renderServiceDeskPage(){
  const t = currentTenant();
  const tickets = t.tickets || [];
  document.getElementById('servicedesk-sub').textContent = t.shortName + ' · ' + tickets.length + ' tickets';
  const open = tickets.filter(x=>x.status==='Open').length;
  const inProgress = tickets.filter(x=>x.status==='In progress').length;
  const resolved = tickets.filter(x=>x.status==='Resolved').length;
  const urgent = tickets.filter(x=>x.priority==='Urgent' && x.status!=='Resolved').length;
  const kpis = [
    { label:'Open tickets', value:String(open), delta:'Awaiting action' },
    { label:'In progress', value:String(inProgress), delta:'Being worked on' },
    { label:'Resolved', value:String(resolved), delta:'This period' },
    { label:'Urgent unresolved', value:String(urgent), delta:urgent>0?'Needs attention':'All clear' }
  ];
  document.getElementById('servicedesk-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  renderTicketList();
}

function renderTicketList(){
  const t = currentTenant();
  const tickets = (t.tickets||[]).filter(x=> currentTicketFilter==='All' || x.status===currentTicketFilter);
  const list = document.getElementById('ticket-list');
  list.innerHTML = tickets.length===0 ? '<div class="empty-inline">No tickets match this filter.</div>'
    : tickets.slice().sort((a,b)=> b.created.localeCompare(a.created)).map(tk=>{
        const e = findEmployee(tk.employeeId);
        const cls = tk.status==='Resolved'?'status-active':tk.status==='In progress'?'status-probation':'status-leave';
        const prioCls = 'priority-'+tk.priority.toLowerCase();
        let actions = '';
        if(tk.status==='Open') actions = '<button class="btn" data-ticket-progress="'+tk.id+'">Start work</button>';
        else if(tk.status==='In progress') actions = '<button class="btn er-approve" data-ticket-resolve="'+tk.id+'">Resolve</button>';
        return '<div class="ticket-row">'+
          '<span class="ticket-id">'+tk.id+'</span>'+
          '<span class="ticket-meta"><span class="tm-subject">'+tk.subject+'</span>'+
          '<span class="tm-detail">'+(e?e.name:'Unknown')+' · '+tk.category+' · '+formatDate(tk.created)+'</span></span>'+
          '<span class="priority-tag '+prioCls+'">'+tk.priority+'</span>'+
          '<span class="status-pill '+cls+'"><span class="dot"></span>'+tk.status+'</span>'+
          '<span class="ticket-actions">'+actions+'</span>'+
          '</div>';
      }).join('');
  document.querySelectorAll('#ticket-filter-chips .chip').forEach(c=>c.classList.toggle('active',c.dataset.ticketFilter===currentTicketFilter));
  list.querySelectorAll('[data-ticket-progress]').forEach(btn=>btn.addEventListener('click',()=>updateTicketStatus(btn.dataset.ticketProgress,'In progress')));
  list.querySelectorAll('[data-ticket-resolve]').forEach(btn=>btn.addEventListener('click',()=>updateTicketStatus(btn.dataset.ticketResolve,'Resolved')));
}

function updateTicketStatus(id, status){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const tk = t.tickets.find(x=>x.id===id);
  if(!tk) return;
  tk.status = status;
  const e = findEmployee(tk.employeeId);
  logActivity(t, 'Ticket '+tk.id+' marked '+status+': '+tk.subject);
  if(status==='Resolved') pushNotification('Your ticket "'+tk.subject+'" has been resolved', 'Service Desk');
  renderServiceDeskPage();
  persistState();
  showToast('Ticket '+(status==='Resolved'?'resolved':'moved to In progress'));
}

function openTicketModal(){
  const t = currentTenant();
  document.getElementById('tkt-requester').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('tkt-subject').value=''; document.getElementById('tkt-desc').value='';
  document.getElementById('ticket-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('tkt-subject').focus(),50);
}
function closeTicketModal(){ document.getElementById('ticket-modal-overlay').classList.remove('open'); }
function submitTicket(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const employeeId = document.getElementById('tkt-requester').value;
  const category = document.getElementById('tkt-category').value;
  const subject = document.getElementById('tkt-subject').value.trim();
  const desc = document.getElementById('tkt-desc').value.trim();
  const priority = document.getElementById('tkt-priority').value;
  if(!subject){ showToast('Add a subject to continue'); return; }
  if(!t.tickets) t.tickets=[];
  const newId = 'TKT-'+t.key.toUpperCase()+'-'+Date.now();
  t.tickets.unshift({ id:newId, employeeId, category, subject, desc, priority, status:'Open', created:new Date().toISOString().slice(0,10) });
  closeTicketModal();
  const e = findEmployee(employeeId);
  logActivity(t, (e?e.name:'Someone')+' submitted a ticket: '+subject);
  renderServiceDeskPage();
  persistState();
  showToast('Ticket submitted');
}

/* ===================================================================== ANNOUNCEMENTS */

function renderAnnouncementsPage(){
  const t = currentTenant();
  const anns = t.announcements || [];
  document.getElementById('announcements-sub').textContent = t.shortName + ' · '+anns.length+' announcements';
  const sorted = anns.slice().sort((a,b)=> (b.pinned===a.pinned?0:b.pinned?1:-1));
  const list = document.getElementById('announcements-list');
  list.innerHTML = sorted.length===0 ? '<div class="empty-inline">No announcements yet.</div>'
    : sorted.map(a=>{
        const catCls = a.category==='Urgent'?'urgent':a.category==='Celebration'?'celebration':'';
        return '<div class="announcement-card'+(a.pinned?' pinned':'')+'">'+
          (a.pinned?'<span class="ac-pin">📌 PINNED</span>':'')+
          '<div class="ac-header"><span class="ac-category '+catCls+'">'+a.category+'</span></div>'+
          '<div class="ac-title">'+a.title+'</div>'+
          '<div class="ac-body">'+a.body+'</div>'+
          '<div class="ac-footer"><span>By '+a.author+'</span><span>'+a.when+'</span></div>'+
          '</div>';
      }).join('');
}

function openAnnouncementModal(){
  document.getElementById('ann-title').value=''; document.getElementById('ann-body').value=''; document.getElementById('ann-pinned').checked=false;
  document.getElementById('announcement-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('ann-title').focus(),50);
}
function closeAnnouncementModal(){ document.getElementById('announcement-modal-overlay').classList.remove('open'); }
function submitAnnouncement(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const title = document.getElementById('ann-title').value.trim();
  const category = document.getElementById('ann-category').value;
  const body = document.getElementById('ann-body').value.trim();
  const pinned = document.getElementById('ann-pinned').checked;
  if(!title || !body){ showToast('Add a title and message to continue'); return; }
  if(!t.announcements) t.announcements=[];
  t.announcements.unshift({ id:'ANN-'+t.key.toUpperCase()+'-'+Date.now(), title, category, body, pinned, author:t.currentUser.name, when:'Just now' });
  closeAnnouncementModal();
  logActivity(t, 'Announcement published: '+title);
  pushNotification('📢 New announcement: '+title, 'Announcement');
  renderAnnouncementsPage();
  persistState();
  showToast('Announcement published');
}

/* ===================================================================== TRAVEL */

function renderTravelPage(){
  const t = currentTenant();
  const trips = t.travelRequests || [];
  document.getElementById('travel-sub').textContent = t.shortName + ' · '+trips.length+' travel requests';
  const pending = trips.filter(x=>x.status==='Pending');
  const approved = trips.filter(x=>x.status==='Approved');
  const totalCost = approved.reduce((s,x)=>s+x.cost,0);
  const kpis = [
    { label:'Pending approval', value:String(pending.length), delta:'Awaiting your review' },
    { label:'Approved trips', value:String(approved.length), delta:formatUGX(totalCost)+' total cost' },
    { label:'Total requests', value:String(trips.length), delta:'All statuses' },
    { label:'Avg. trip cost', value:trips.length?formatUGX(trips.reduce((s,x)=>s+x.cost,0)/trips.length):'—', delta:'Across all requests' }
  ];
  document.getElementById('travel-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  document.getElementById('travel-pending-hint').textContent = pending.length+' request'+(pending.length===1?'':'s')+' awaiting review';
  const pendingList = document.getElementById('travel-pending-list');
  pendingList.innerHTML = pending.length===0 ? '<div class="empty-inline">No pending travel requests.</div>'
    : pending.map(trv=>{
        const e = findEmployee(trv.employeeId);
        return '<div class="travel-row"><span class="avatar">'+initials(e?e.name:'?')+'</span>'+
          '<span class="ticket-meta"><span class="tr-dest">'+trv.destination+'</span><span class="tr-detail">'+(e?e.name:'Unknown')+' · '+trv.purpose+' · '+formatDate(trv.departDate)+' – '+formatDate(trv.returnDate)+'</span></span>'+
          '<span class="tr-cost">'+formatUGX(trv.cost)+'</span>'+
          '<span class="tr-actions"><button class="btn tr-reject" data-deny-travel="'+trv.id+'">Decline</button><button class="btn tr-approve" data-approve-travel="'+trv.id+'">Approve</button></span>'+
          '</div>';
      }).join('');
  pendingList.querySelectorAll('[data-approve-travel]').forEach(btn=>btn.addEventListener('click',()=>decideTravelRequest(btn.dataset.approveTravel,'Approved')));
  pendingList.querySelectorAll('[data-deny-travel]').forEach(btn=>btn.addEventListener('click',()=>decideTravelRequest(btn.dataset.denyTravel,'Declined')));
  const tbody = document.getElementById('travel-tbody');
  tbody.innerHTML = trips.map(trv=>{
    const e = findEmployee(trv.employeeId);
    const cls = trv.status==='Approved'?'status-active':trv.status==='Declined'?'status-maintenance':'status-probation';
    return '<tr><td><div class="who-cell"><span class="avatar">'+initials(e?e.name:'?')+'</span><span class="name">'+(e?e.name:'Unknown')+'</span></div></td>'+
      '<td>'+trv.destination+'</td><td style="font-size:12.5px;">'+trv.purpose+'</td>'+
      '<td style="font-size:12px;">'+formatDate(trv.departDate)+' – '+formatDate(trv.returnDate)+'</td>'+
      '<td class="salary-cell">'+formatUGX(trv.cost)+'</td>'+
      '<td><span class="status-pill '+cls+'"><span class="dot"></span>'+trv.status+'</span></td></tr>';
  }).join('') || '<tr><td colspan="6"><div class="empty-state"><div class="glyph">✈️</div><h4>No travel requests yet</h4></div></td></tr>';
}

function decideTravelRequest(id, decision){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const trv = t.travelRequests.find(x=>x.id===id);
  if(!trv) return;
  trv.status = decision;
  const e = findEmployee(trv.employeeId);
  logActivity(t, (e?e.name:'Employee')+"'s travel to "+trv.destination+' was '+decision.toLowerCase());
  if(e) pushNotification('Your travel request to '+trv.destination+' was '+decision.toLowerCase(), 'Travel');
  renderTravelPage();
  persistState();
  showToast('Travel request '+decision.toLowerCase());
}

function openTravelModal(){
  const t = currentTenant();
  document.getElementById('trv-traveller').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('trv-destination').value=''; document.getElementById('trv-purpose').value=''; document.getElementById('trv-cost').value='';
  const depart = new Date(); depart.setDate(depart.getDate()+14);
  const ret = new Date(depart); ret.setDate(ret.getDate()+3);
  document.getElementById('trv-depart').value = depart.toISOString().slice(0,10);
  document.getElementById('trv-return').value = ret.toISOString().slice(0,10);
  document.getElementById('travel-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('trv-destination').focus(),50);
}
function closeTravelModal(){ document.getElementById('travel-modal-overlay').classList.remove('open'); }
function submitTravel(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const employeeId = document.getElementById('trv-traveller').value;
  const destination = document.getElementById('trv-destination').value.trim();
  const purpose = document.getElementById('trv-purpose').value.trim();
  const departDate = document.getElementById('trv-depart').value;
  const returnDate = document.getElementById('trv-return').value;
  const cost = Number(document.getElementById('trv-cost').value)||0;
  if(!destination || !purpose){ showToast('Add a destination and purpose to continue'); return; }
  if(!t.travelRequests) t.travelRequests=[];
  t.travelRequests.unshift({ id:'TRV-'+t.key.toUpperCase()+'-'+Date.now(), employeeId, destination, purpose, departDate, returnDate, cost, status:'Pending' });
  closeTravelModal();
  const e = findEmployee(employeeId);
  logActivity(t, (e?e.name:'Someone')+' requested travel to '+destination);
  renderTravelPage();
  persistState();
  showToast('Travel request submitted — awaiting approval');
}

/* ===================================================================== ONBOARDING */

const ONBOARDING_CHECKLIST_TEMPLATE = ['Sign contract & HR paperwork','IT account & equipment setup','Department orientation','Meet your buddy','Complete mandatory training','First week check-in','30-day review scheduled'];

function renderOnboardingPage(){
  const t = currentTenant();
  const plans = t.onboardingPlans || [];
  document.getElementById('onboarding-sub').textContent = t.shortName + ' · '+plans.length+' active or recent plans';
  const active = plans.filter(p=> Object.values(p.checklist).some(v=>!v)).length;
  const completed = plans.filter(p=> Object.values(p.checklist).every(v=>v)).length;
  const avgPct = plans.length ? Math.round(plans.reduce((s,p)=>{
    const vals = Object.values(p.checklist);
    return s + (vals.filter(Boolean).length/vals.length*100);
  },0)/plans.length) : 0;
  const kpis = [
    { label:'Active plans', value:String(active), delta:'In progress' },
    { label:'Completed plans', value:String(completed), delta:'Fully onboarded' },
    { label:'Avg. completion', value:avgPct+'%', delta:'Across active plans' },
    { label:'Total plans', value:String(plans.length), delta:'All time' }
  ];
  document.getElementById('onboarding-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  const list = document.getElementById('onboarding-active-list');
  list.innerHTML = plans.length===0 ? '<div class="empty-inline">No onboarding plans yet. Start one above.</div>'
    : plans.map(p=>{
        const e = findEmployee(p.employeeId);
        const buddy = p.buddyId ? findEmployee(p.buddyId) : null;
        const vals = Object.values(p.checklist);
        const pct = Math.round(vals.filter(Boolean).length/vals.length*100);
        const days = Math.max(0, Math.round((Date.now()-dateOnly(p.startDate))/86400000));
        const items = Object.entries(p.checklist).map(([label,checked])=>
          '<div class="checklist-item'+(checked?' checked':'')+'"><input type="checkbox" data-ob-check="'+p.id+'" data-ob-item="'+label+'" '+(checked?'checked':'')+'><span class="ci-label">'+label+'</span></div>'
        ).join('');
        return '<div class="onboarding-card">'+
          '<div class="oc-header"><span class="avatar">'+initials(e?e.name:'?')+'</span><span><span class="oc-name">'+(e?e.name:'Unknown')+'<span class="ob-day-tag">Day '+days+'</span></span>'+
          '<span class="oc-meta">'+(e?e.title:'')+' · Started '+formatDate(p.startDate)+(buddy?' · Buddy: '+buddy.name:'')+'</span></span></div>'+
          '<div class="oc-progress"><div class="dept-bar-track" style="flex:1;"><div class="dept-bar-fill" style="width:'+pct+'%"></div></div><span class="oc-pct">'+pct+'%</span></div>'+
          items +
          '</div>';
      }).join('');
  list.querySelectorAll('[data-ob-check]').forEach(cb=>{
    cb.addEventListener('change', ()=> toggleOnboardingItem(cb.dataset.obCheck, cb.dataset.obItem, cb.checked));
  });
  renderOnboardingChecklistTemplate();
}

function toggleOnboardingItem(planId, item, checked){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const p = t.onboardingPlans.find(x=>x.id===planId);
  if(!p) return;
  p.checklist[item] = checked;
  const e = findEmployee(p.employeeId);
  const allDone = Object.values(p.checklist).every(Boolean);
  if(allDone) logActivity(t, (e?e.name:'New hire')+"'s onboarding plan is complete");
  renderOnboardingPage();
  persistState();
}

function renderOnboardingChecklistTemplate(){
  const el = document.getElementById('onboarding-checklist');
  el.innerHTML = ONBOARDING_CHECKLIST_TEMPLATE.map((item,i)=>
    '<div class="checklist-item"><span style="width:16px;height:16px;border-radius:4px;border:2px solid var(--border-strong);flex-shrink:0;"></span><span class="ci-label">'+item+'</span><span class="ci-owner">Step '+(i+1)+' of '+ONBOARDING_CHECKLIST_TEMPLATE.length+'</span></div>'
  ).join('');
}

function openOnboardingModal(){
  const t = currentTenant();
  document.getElementById('ob-employee').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('ob-buddy').innerHTML = '<option value="">No buddy assigned</option>'+t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('ob-startdate').value = new Date().toISOString().slice(0,10);
  document.getElementById('onboarding-modal-overlay').classList.add('open');
}
function closeOnboardingModal(){ document.getElementById('onboarding-modal-overlay').classList.remove('open'); }
function submitOnboarding(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const employeeId = document.getElementById('ob-employee').value;
  const buddyId = document.getElementById('ob-buddy').value;
  const startDate = document.getElementById('ob-startdate').value;
  if(!employeeId){ showToast('Select a new hire to continue'); return; }
  if(!t.onboardingPlans) t.onboardingPlans=[];
  const checklist = {};
  ONBOARDING_CHECKLIST_TEMPLATE.forEach(item=> checklist[item]=false);
  t.onboardingPlans.unshift({ id:'OB-'+t.key.toUpperCase()+'-'+Date.now(), employeeId, buddyId, startDate, checklist });
  closeOnboardingModal();
  const e = findEmployee(employeeId);
  logActivity(t, 'Onboarding plan started for '+(e?e.name:'new hire'));
  renderOnboardingPage();
  persistState();
  showToast('Onboarding plan started');
}

/* ===================================================================== KNOWLEDGE BASE */

let currentKBCategory = 'All';
let currentKBSearch = '';
function renderKnowledgePage(){
  const t = currentTenant();
  const articles = t.knowledgeArticles || [];
  document.getElementById('knowledge-sub').textContent = t.shortName + ' · '+articles.length+' articles';
  const cats = [...new Set(articles.map(a=>a.category))];
  const chips = document.getElementById('knowledge-category-chips');
  chips.innerHTML = '';
  ['All',...cats].forEach(cat=>{
    const btn = document.createElement('button');
    btn.className='chip'+(cat===currentKBCategory?' active':''); btn.textContent=cat; btn.dataset.kbCat=cat;
    btn.addEventListener('click',()=>{ currentKBCategory=cat; renderKnowledgePage(); });
    chips.appendChild(btn);
  });
  document.getElementById('knowledge-search').value = currentKBSearch;
  const q = currentKBSearch.toLowerCase();
  const filtered = articles.filter(a=>{
    if(currentKBCategory!=='All' && a.category!==currentKBCategory) return false;
    if(q && !(a.title+a.content).toLowerCase().includes(q)) return false;
    return true;
  });
  const list = document.getElementById('knowledge-list');
  list.innerHTML = filtered.length===0 ? '<div class="empty-state"><div class="glyph">📚</div><h4>No articles match</h4><p>Try a different search or category.</p></div>'
    : filtered.map(a=>{
        const preview = a.content.length>140 ? a.content.slice(0,140)+'…' : a.content;
        return '<div class="kb-article" data-kb-article="'+a.id+'">'+
          '<div class="ka-title">'+a.title+'</div>'+
          '<div class="ka-preview">'+preview+'</div>'+
          '<div class="ka-footer"><span class="kb-category-tag">'+a.category+'</span><span>By '+a.author+' · Updated '+formatDate(a.updated)+'</span></div>'+
          '</div>';
      }).join('');
  list.querySelectorAll('[data-kb-article]').forEach(el=>{
    el.addEventListener('click', ()=> expandKBArticle(el.dataset.kbArticle));
  });
}

function expandKBArticle(id){
  const t = currentTenant();
  const a = (t.knowledgeArticles||[]).find(x=>x.id===id);
  if(!a) return;
  const list = document.getElementById('knowledge-list');
  list.innerHTML = '<div class="kb-article-expanded">'+
    '<button class="btn btn-quiet" id="kb-back-btn" style="margin-bottom:14px;">← Back to all articles</button>'+
    '<span class="kb-category-tag">'+a.category+'</span>'+
    '<div class="ka-title">'+a.title+'</div>'+
    '<div class="ka-body">'+a.content+'</div>'+
    '<div class="ka-footer" style="margin-top:16px;">By '+a.author+' · Updated '+formatDate(a.updated)+'</div>'+
    '</div>';
  document.getElementById('kb-back-btn').addEventListener('click', renderKnowledgePage);
}

function openArticleModal(){
  document.getElementById('art-title').value=''; document.getElementById('art-content').value='';
  document.getElementById('article-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('art-title').focus(),50);
}
function closeArticleModal(){ document.getElementById('article-modal-overlay').classList.remove('open'); }
function submitArticle(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const title = document.getElementById('art-title').value.trim();
  const category = document.getElementById('art-category').value;
  const content = document.getElementById('art-content').value.trim();
  if(!title || !content){ showToast('Add a title and content to continue'); return; }
  if(!t.knowledgeArticles) t.knowledgeArticles=[];
  t.knowledgeArticles.unshift({ id:'KB-'+t.key.toUpperCase()+'-'+Date.now(), title, category, content, author:t.currentUser.name, updated:new Date().toISOString().slice(0,10) });
  closeArticleModal();
  logActivity(t, 'New knowledge base article published: '+title);
  renderKnowledgePage();
  persistState();
  showToast('Article published');
}




/* ===================================================================== SUCCESSION PLANNING */

function renderSuccessionPage(){
  const t = currentTenant();
  document.getElementById('succession-sub').textContent = t.shortName + ' · talent pipeline and succession map';
  const plans = t.successionPlan || [];
  const ready = plans.filter(p=>p.readiness==='ready').length;
  const soon = plans.filter(p=>p.readiness==='soon').length;
  const dev = plans.filter(p=>p.readiness==='dev').length;
  const kpis = [
    { label:'Key roles mapped', value:String(plans.length), delta:'In succession plan' },
    { label:'Ready now', value:String(ready), delta:'Can step up immediately' },
    { label:'Ready in 1–2 yrs', value:String(soon), delta:'Development on track' },
    { label:'Development needed', value:String(dev), delta:'Requires investment' }
  ];
  document.getElementById('succession-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');

  const map = document.getElementById('succession-map');
  map.innerHTML = plans.length===0 ? '<div class="empty-inline">No succession plans added yet.</div>'
    : plans.map(p=>{
        const incumbent = p.incumbentId ? findEmployee(p.incumbentId) : null;
        const candidate = p.candidateId ? findEmployee(p.candidateId) : null;
        const rdyCls = p.readiness==='ready'?'readiness-ready':p.readiness==='soon'?'readiness-soon':'readiness-dev';
        const rdyLabel = p.readiness==='ready'?'🟢 Ready now':p.readiness==='soon'?'🟡 Ready in 1–2 yrs':'🔴 Development needed';
        return '<div class="succession-row">'+
          '<div style="display:flex;flex-direction:column;gap:4px;align-items:center;">'+
            '<span class="avatar">'+(incumbent?initials(incumbent.name):'?')+'</span>'+
            '<span style="font-size:9.5px;color:var(--ink-faint);">NOW</span>'+
          '</div>'+
          '<div><div class="sr-role">'+p.role+'</div><div class="sr-meta">'+(incumbent?incumbent.name+' · '+incumbent.title:'Vacant')+'</div>'+
          (p.notes?'<div class="sr-meta" style="margin-top:4px;font-style:italic;">'+p.notes+'</div>':'')+'</div>'+
          '<span style="font-size:20px;color:var(--ink-faint);">→</span>'+
          '<div style="display:flex;flex-direction:column;gap:4px;align-items:center;">'+
            '<span class="avatar" style="background:var(--accent-soft);color:var(--accent-strong);">'+(candidate?initials(candidate.name):'?')+'</span>'+
            '<span style="font-size:9.5px;color:var(--ink-faint);">NEXT</span>'+
          '</div>'+
          '<div><div class="sr-role">'+(candidate?candidate.name:'TBD')+'</div><div class="sr-meta">'+(candidate?candidate.title+' · '+candidate.department:'')+'</div>'+
          '<span class="readiness-badge '+rdyCls+'" style="margin-top:6px;">'+rdyLabel+'</span></div>'+
          '</div>';
      }).join('');

  const pipeline = document.getElementById('succession-pipeline');
  document.getElementById('succession-pipeline-hint').textContent = t.employees.length + ' people · ' + plans.length + ' key roles mapped';
  const candidateIds = new Set((plans).map(p=>p.candidateId).filter(Boolean));
  const pipelineEmps = t.employees.filter(e=> candidateIds.has(e.id));
  pipeline.innerHTML = pipelineEmps.length===0 ? '<div class="empty-inline">Add successors to build the talent pipeline.</div>'
    : pipelineEmps.map(e=>{
        const myPlan = plans.find(p=>p.candidateId===e.id);
        const r = t.reviews[e.id];
        const rating = r && r.rating ? r.rating : 0;
        const bars = [1,2,3,4,5].map(n=>'<span class="'+(n<=rating?'filled':'empty')+'"></span>').join('');
        const rdyCls = myPlan ? (myPlan.readiness==='ready'?'readiness-ready':myPlan.readiness==='soon'?'readiness-soon':'readiness-dev') : '';
        const rdyLabel = myPlan ? (myPlan.readiness==='ready'?'Ready now':myPlan.readiness==='soon'?'1–2 yrs':'Dev needed') : '';
        return '<div class="pipeline-card">'+
          '<span class="avatar">'+initials(e.name)+'</span>'+
          '<div class="pc-meta"><div class="pc-name">'+e.name+'</div>'+
          '<div class="pc-detail">'+e.title+' · '+e.department+'</div>'+
          '<div class="potential-bar">'+bars+'</div></div>'+
          (rdyLabel?'<span class="readiness-badge '+rdyCls+'" style="font-size:10.5px;">'+rdyLabel+'</span>':'')+
          '</div>';
      }).join('');
}

function openSuccessorModal(){
  const t = currentTenant();
  const opts = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('suc-incumbent').innerHTML = '<option value="">Vacant / external</option>'+opts;
  document.getElementById('suc-candidate').innerHTML = opts;
  document.getElementById('suc-role').value=''; document.getElementById('suc-notes').value='';
  document.getElementById('successor-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('suc-role').focus(),50);
}
function closeSuccessorModal(){ document.getElementById('successor-modal-overlay').classList.remove('open'); }
function submitSuccessor(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const role = document.getElementById('suc-role').value.trim();
  const incumbentId = document.getElementById('suc-incumbent').value;
  const candidateId = document.getElementById('suc-candidate').value;
  const readiness = document.getElementById('suc-readiness').value;
  const notes = document.getElementById('suc-notes').value.trim();
  if(!role){ showToast('Add the key role name to continue'); return; }
  if(!t.successionPlan) t.successionPlan=[];
  t.successionPlan.push({ id:'SUC-'+t.key.toUpperCase()+'-'+Date.now(), role, incumbentId, candidateId, readiness, notes });
  closeSuccessorModal();
  const c = findEmployee(candidateId);
  logActivity(t, (c?c.name:'Someone')+' added to succession plan for '+role);
  renderSuccessionPage();
  persistState();
  showToast('Succession plan updated');
}

/* ===================================================================== WORKFORCE PLANNING */

function renderWorkforcePage(){
  const t = currentTenant();
  const plans = t.workforcePlan || [];
  document.getElementById('workforce-sub').textContent = t.shortName + ' · headcount and budget planning';
  const totalPlanned = plans.reduce((s,p)=>s+p.planned,0);
  const totalCurrent = t.employees.length;
  const totalBudget = plans.reduce((s,p)=>s+p.budget,0);
  const totalActual = t.employees.reduce((s,e)=>s+e.salary,0);
  const kpis = [
    { label:'Current headcount', value:String(totalCurrent), delta:'Actual employees' },
    { label:'Planned headcount', value:String(totalPlanned), delta:'End of planning period' },
    { label:'Headcount gap', value:String(Math.max(0,totalPlanned-totalCurrent)), delta:totalPlanned>totalCurrent?'Roles to fill':'On or above plan' },
    { label:'Budget vs. actual', value:totalBudget>0?Math.round(totalActual/totalBudget*100)+'%':'—', delta:formatUGX(totalActual)+' of '+formatUGX(totalBudget) }
  ];
  document.getElementById('workforce-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');

  const months = lastSixMonthLabels();
  const forecast = months.map((_,i)=> totalCurrent + Math.round((totalPlanned-totalCurrent)*(i+1)/6));
  const actual = [totalCurrent,...t.hireTrend.slice(1).map((_,i)=> totalCurrent + t.hireTrend.slice(0,i+1).reduce((a,b)=>a+b,0))].slice(0,6);
  const accent = t.accent;
  const barW=34,gap=18,padL=8,padR=8,padT=16,padB=54,chartH=130;
  const totalW=months.length*(barW+gap)-gap+padL+padR;
  const maxVal=Math.max(...forecast,...actual,totalCurrent+5);
  let bars='',labels='',valLabels='';
  months.forEach((m,i)=>{
    const xF=padL+i*(barW+gap);
    const xA=xF+barW/2-6;
    const bHF=Math.max(2,Math.round(forecast[i]/maxVal*chartH));
    const bHA=Math.max(2,Math.round((actual[i]||0)/maxVal*chartH));
    const yF=padT+chartH-bHF;
    bars+='<rect x="'+xF+'" y="'+yF+'" width="'+(barW/2-2)+'" height="'+bHF+'" rx="3" fill="'+accent+'" opacity="0.85"/>';
    bars+='<rect x="'+(xF+barW/2)+'" y="'+(padT+chartH-bHA)+'" width="'+(barW/2-2)+'" height="'+bHA+'" rx="3" fill="'+accent+'" opacity="0.35"/>';
    labels+='<text class="svg-label" x="'+(xF+barW/2)+'" y="'+(padT+chartH+18)+'" text-anchor="middle">'+m+'</text>';
    valLabels+='<text class="svg-value-label" x="'+(xF+barW/4)+'" y="'+(yF-4)+'" text-anchor="middle">'+forecast[i]+'</text>';
  });
  const svgH=padT+chartH+padB;
  const legend='<div class="forecast-legend"><span><span class="dot-plan"></span>Planned</span><span><span class="dot-actual"></span>Actual</span></div>';
  document.getElementById('workforce-forecast-chart').innerHTML=legend+'<div class="svg-chart"><svg width="'+totalW+'" height="'+svgH+'" viewBox="0 0 '+totalW+' '+svgH+'">'+bars+valLabels+labels+'</svg></div>';

  const budgetPairs = plans.map(p=>[p.dept, p.budget]);
  const actualPairs = plans.map(p=>{
    const deptActual = t.employees.filter(e=>e.department===p.dept).reduce((s,e)=>s+e.salary,0);
    return [p.dept, deptActual];
  });
  const bMax = Math.max(...budgetPairs.map(p=>p[1]),...actualPairs.map(p=>p[1]),1);
  document.getElementById('workforce-budget-chart').innerHTML = plans.map(p=>{
    const actual2 = t.employees.filter(e=>e.department===p.dept).reduce((s,e)=>s+e.salary,0);
    const pct = Math.round(actual2/p.budget*100);
    return '<div class="dept-row"><span class="dname">'+p.dept+'</span>'+
      '<span class="dept-bar-track"><span class="dept-bar-fill" style="width:'+(actual2/bMax*100)+'%"></span></span>'+
      '<span class="dcount '+(pct>100?'variance-negative':'variance-positive')+'">'+pct+'%</span></div>';
  }).join('') || '<div class="empty-inline">No department plans yet. Add one above.</div>';

  const tbody = document.getElementById('workforce-dept-tbody');
  const deptActualMap={};
  t.employees.forEach(e=>{ deptActualMap[e.department]=(deptActualMap[e.department]||0)+1; });
  const openReqMap={};
  (t.openings||[]).filter(o=>o.status==='Open').forEach(o=>{ openReqMap[o.department]=(openReqMap[o.department]||0)+1; });
  tbody.innerHTML = plans.map(p=>{
    const cur=deptActualMap[p.dept]||0;
    const variance=p.planned-cur;
    return '<tr><td>'+p.dept+'</td>'+
      '<td style="font-family:var(--font-mono);">'+cur+'</td>'+
      '<td style="font-family:var(--font-mono);">'+p.planned+'</td>'+
      '<td class="'+(variance>0?'variance-negative':variance<0?'variance-positive':'')+'">'+
        (variance>0?'+':'')+variance+'</td>'+
      '<td style="font-family:var(--font-mono);">'+(openReqMap[p.dept]||0)+'</td>'+
      '<td class="salary-cell">'+formatUGX(p.budget)+'</td></tr>';
  }).join('') || '<tr><td colspan="6"><div class="empty-inline">No plans yet.</div></td></tr>';
}

function openHeadcountModal(){
  const t = currentTenant();
  document.getElementById('hcp-dept').innerHTML = t.departments.map(d=>'<option>'+d+'</option>').join('');
  document.getElementById('hcp-planned').value=''; document.getElementById('hcp-budget').value='';
  document.getElementById('headcount-modal-overlay').classList.add('open');
}
function closeHeadcountModal(){ document.getElementById('headcount-modal-overlay').classList.remove('open'); }
function submitHeadcountPlan(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const dept = document.getElementById('hcp-dept').value;
  const planned = Number(document.getElementById('hcp-planned').value)||0;
  const budget = Number(document.getElementById('hcp-budget').value)||0;
  if(!planned){ showToast('Add a planned headcount number to continue'); return; }
  if(!t.workforcePlan) t.workforcePlan=[];
  const existing = t.workforcePlan.find(p=>p.dept===dept);
  if(existing){ existing.planned=planned; existing.budget=budget; }
  else { t.workforcePlan.push({ dept, current:t.employees.filter(e=>e.department===dept).length, planned, budget }); }
  closeHeadcountModal();
  logActivity(t, 'Workforce plan updated for '+dept);
  renderWorkforcePage();
  persistState();
  showToast('Workforce plan updated for '+dept);
}

/* ===================================================================== COMPENSATION PLANNING */

function renderCompensationPage(){
  const t = currentTenant();
  document.getElementById('compensation-sub').textContent = t.shortName + ' · salary bands and merit planning';
  const cycle = t.meritCycle || { label:'No active cycle', status:'Closed', proposals:[] };
  const proposals = cycle.proposals || [];
  const approved = proposals.filter(p=>p.status==='Approved').length;
  const totalIncreaseUGX = proposals.filter(p=>p.status==='Approved').reduce((s,p)=>s+(p.currentSalary*p.proposedIncreasePct/100),0);
  const avgIncrease = proposals.length ? (proposals.reduce((s,p)=>s+p.proposedIncreasePct,0)/proposals.length).toFixed(1) : 0;
  const kpis = [
    { label:'Active cycle', value:cycle.label.split(' ')[0]+' '+cycle.label.split(' ')[1], delta:cycle.status },
    { label:'Proposals', value:String(proposals.length), delta:approved+' approved' },
    { label:'Avg. increase', value:avgIncrease+'%', delta:'Across all proposals' },
    { label:'Total approved cost', value:formatUGX(totalIncreaseUGX), delta:'Monthly incremental' }
  ];
  document.getElementById('compensation-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value value-currency">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  document.getElementById('merit-cycle-label').textContent = cycle.label + ' · ' + cycle.status;
  const bands = t.salaryBands || [];
  const maxSal = Math.max(...bands.map(b=>b.maxSalary),1);
  document.getElementById('salary-bands-list').innerHTML = bands.map(b=>{
    const midPct = (b.midSalary - b.minSalary)/(b.maxSalary - b.minSalary)*100;
    const deptActuals = t.employees.filter(e=>e.department===b.deptTag).map(e=>e.salary);
    const avgActual = deptActuals.length ? deptActuals.reduce((a,s)=>a+s,0)/deptActuals.length : 0;
    const markerPct = avgActual>0 ? Math.min(100,Math.max(0,(avgActual-b.minSalary)/(b.maxSalary-b.minSalary)*100)) : null;
    return '<div class="salary-band-row">'+
      '<div class="sb-dept">'+b.grade+'<div class="sr-meta">'+b.deptTag+' · '+formatUGX(b.minSalary)+' – '+formatUGX(b.maxSalary)+'</div></div>'+
      '<div class="salary-band-bar">'+
        '<div class="salary-band-fill" style="width:100%;"></div>'+
        (markerPct!==null?'<div class="salary-band-marker" style="left:'+markerPct+'%;top:50%;transform:translate(-50%,-50%);"></div>':'')+
      '</div>'+
      '<div style="font-size:12px;color:var(--ink-faint);white-space:nowrap;">'+
        'Mid: '+formatUGX(b.midSalary)+(avgActual>0?' | Avg: '+formatUGX(avgActual):'')+
      '</div></div>';
  }).join('') || '<div class="empty-inline">No salary bands defined.</div>';

  const tbody = document.getElementById('merit-tbody');
  tbody.innerHTML = proposals.map(p=>{
    const e = findEmployee(p.employeeId);
    const inc = Math.round(p.currentSalary*p.proposedIncreasePct/100);
    const newSal = p.currentSalary+inc;
    const badge = p.status==='Approved'?'<span class="merit-badge-approved">Approved</span>':'<span class="merit-badge-pending">Pending</span>';
    return '<tr><td><div class="who-cell"><span class="avatar">'+initials(e?e.name:'?')+'</span><span class="name">'+(e?e.name:'Unknown')+'</span></div></td>'+
      '<td>'+(e?e.department:'—')+'</td>'+
      '<td class="salary-cell">'+formatUGX(p.currentSalary)+'</td>'+
      '<td style="font-family:var(--font-mono);color:var(--accent-strong);">+'+p.proposedIncreasePct+'% ('+formatUGX(inc)+')</td>'+
      '<td class="salary-cell net">'+formatUGX(newSal)+'</td>'+
      '<td style="font-size:12px;color:var(--ink-soft);max-width:200px;">'+p.justification+'</td>'+
      '<td>'+badge+'</td></tr>';
  }).join('') || '<tr><td colspan="7"><div class="empty-inline">No merit proposals yet. Run a merit cycle to generate proposals.</div></td></tr>';

  const deptAverages = {};
  t.departments.forEach(d=>{
    const emps = t.employees.filter(e=>e.department===d);
    if(emps.length) deptAverages[d] = Math.round(emps.reduce((s,e)=>s+e.salary,0)/emps.length);
  });
  const pairs = Object.entries(deptAverages).sort((a,b)=>b[1]-a[1]);
  renderBarRows('pay-equity-chart', pairs, formatUGX);
}

function runMeritCycle(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  if(!t.meritCycle) t.meritCycle = { label:'FY 2026–27 Merit Cycle', status:'Open', proposals:[] };
  if(t.meritCycle.proposals.length>0){
    showToast('A merit cycle is already running. Review proposals in the table below.');
    return;
  }
  const completed = Object.entries(t.reviews).filter(([,r])=>r.status==='Completed' && r.rating>=4).map(([id])=>id);
  completed.forEach(id=>{
    const e = findEmployee(id);
    if(!e) return;
    const r = t.reviews[id];
    const pct = r.rating===5 ? 10 : r.rating===4 ? 7 : 5;
    t.meritCycle.proposals.push({ employeeId:id, currentSalary:e.salary, proposedIncreasePct:pct, justification:'Auto-generated from performance review rating ('+r.rating+'/5).', status:'Pending' });
  });
  logActivity(t, 'Merit cycle started: '+t.meritCycle.label);
  renderCompensationPage();
  persistState();
  showToast('Merit cycle generated — '+t.meritCycle.proposals.length+' proposals ready for review');
}

/* ===================================================================== EXECUTIVE DASHBOARD */

function renderExecutivePage(){
  const allTenants = Object.values(TENANTS);
  document.getElementById('executive-sub').textContent = 'Cross-organization overview · ' + allTenants.length + ' workspaces';

  // org switcher chips (just visual for highlighting)
  const switcher = document.getElementById('exec-org-switcher');
  switcher.innerHTML = allTenants.map(t=>
    '<span style="display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:var(--r-pill);border:1px solid var(--border);font-size:12.5px;font-weight:600;background:var(--paper-raised);">'+
    '<span style="width:8px;height:8px;border-radius:50%;background:'+t.accent+'"></span>'+t.shortName+'</span>'
  ).join('');

  // KPI grid — one card per metric per org
  const kpiDefs = [
    { label:'Headcount', fn:t=> t.employees.length },
    { label:'Open roles', fn:t=> (t.openings||[]).filter(o=>o.status==='Open').length },
    { label:'Payroll cost/mo', fn:t=> formatUGX(t.employees.reduce((s,e)=>s+e.salary,0)), currency:true },
    { label:'Pulse score', fn:t=> ((t.pulseTrend||[]).slice(-1)[0]||0)+'%' },
    { label:'Pending leaves', fn:t=> (t.leaveRequests||[]).filter(r=>r.status==='Pending').length },
    { label:'Open tickets', fn:t=> (t.tickets||[]).filter(x=>x.status==='Open').length }
  ];

  document.getElementById('executive-kpi-grid').innerHTML = '<div class="exec-kpi-grid">' +
    allTenants.flatMap(t=>kpiDefs.map(k=>
      '<div class="exec-kpi-card" style="border-left:3px solid '+t.accent+';">'+
        '<div class="ek-org">'+t.shortName+'</div>'+
        '<div class="ek-label">'+k.label+'</div>'+
        '<div class="ek-value">'+k.fn(t)+'</div>'+
      '</div>'
    )).join('') + '</div>';

  // Charts
  renderBarRows('exec-headcount-chart', allTenants.map(t=>[t.shortName, t.employees.length]));
  renderBarRows('exec-payroll-chart', allTenants.map(t=>[t.shortName, t.employees.reduce((s,e)=>s+e.salary,0)]), formatUGX);
  renderBarRows('exec-pulse-chart', allTenants.map(t=>[ t.shortName, (t.pulseTrend||[]).slice(-1)[0]||0 ]));
  renderBarRows('exec-roles-chart', allTenants.map(t=>[ t.shortName, (t.openings||[]).filter(o=>o.status==='Open').length ]));

  // Pending actions
  const pending = allTenants.flatMap(t=>[
    { org:t.shortName, action:'Pending leave requests', count:(t.leaveRequests||[]).filter(r=>r.status==='Pending').length, accent:t.accent },
    { org:t.shortName, action:'Open service desk tickets', count:(t.tickets||[]).filter(x=>x.status==='Open').length, accent:t.accent },
    { org:t.shortName, action:'Travel requests awaiting approval', count:(t.travelRequests||[]).filter(x=>x.status==='Pending').length, accent:t.accent },
    { org:t.shortName, action:'Expense claims pending', count:(t.expenses||[]).filter(x=>x.status==='Pending').length, accent:t.accent },
    { org:t.shortName, action:'e-Signatures pending', count:(t.signatureRequests||[]).filter(x=>x.status==='Pending').length, accent:t.accent }
  ]).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);

  document.getElementById('exec-pending-list').innerHTML = pending.length===0
    ? '<div class="empty-inline">No pending actions across any organization. All caught up.</div>'
    : pending.map(p=>
        '<div class="exec-pending-row">'+
        '<span class="ep-org" style="background:transparent;border:1px solid '+p.accent+';color:'+p.accent+';">'+p.org+'</span>'+
        '<span class="ep-action">'+p.action+'</span>'+
        '<span class="ep-count">'+p.count+'</span>'+
        '</div>'
      ).join('');
}

/* ===================================================================== DIGITAL SIGNATURES */

let currentSigRequestId = null;
let sigCanvas, sigCtx, sigDrawing = false;

function renderSignaturesPage(){
  const t = currentTenant();
  const sigs = t.signatureRequests || [];
  document.getElementById('signatures-sub').textContent = t.shortName + ' · e-signature requests';
  const pending = sigs.filter(s=>s.status==='Pending').length;
  const signed = sigs.filter(s=>s.status==='Signed').length;
  const declined = sigs.filter(s=>s.status==='Declined').length;
  const kpis = [
    { label:'Pending signatures', value:String(pending), delta:'Awaiting response' },
    { label:'Signed', value:String(signed), delta:'Documents executed' },
    { label:'Declined', value:String(declined), delta:'Rejected by signee' },
    { label:'Total requests', value:String(sigs.length), delta:'All time' }
  ];
  document.getElementById('signatures-kpi-row').innerHTML = kpis.map(k=>'<div class="kpi-card"><div class="label">'+k.label+'</div><div class="value-row"><span class="value">'+k.value+'</span></div><div class="delta">'+k.delta+'</div></div>').join('');
  document.getElementById('sig-pending-hint').textContent = pending+' awaiting signature';
  const pendingList = document.getElementById('sig-pending-list');
  const pendingItems = sigs.filter(s=>s.status==='Pending');
  pendingList.innerHTML = pendingItems.length===0 ? '<div class="empty-inline">No signatures pending right now.</div>'
    : pendingItems.map(s=>{
        const e = findEmployee(s.signeeId);
        const overdue = s.deadline && dateOnly(s.deadline) < dateOnly(new Date().toISOString().slice(0,10));
        return '<div class="sig-row">'+
          '<span class="avatar">'+initials(e?e.name:'?')+'</span>'+
          '<div class="sig-meta"><div class="sig-doc-name">'+s.docName+(overdue?' <span style="color:var(--danger);font-size:10.5px;font-weight:700;">OVERDUE</span>':'')+'</div>'+
          '<div class="sig-detail">'+s.docType+' · '+(e?e.name:'Unknown')+' · Due '+formatDate(s.deadline)+'</div></div>'+
          '<span class="sig-doc-type-tag">'+s.docType+'</span>'+
          '<span class="sig-actions">'+
            '<button class="btn" data-sig-sign="'+s.id+'">Open to sign</button>'+
            '<button class="btn btn-quiet" data-sig-remind="'+s.id+'" style="font-size:11.5px;">Remind</button>'+
          '</span></div>';
      }).join('');
  pendingList.querySelectorAll('[data-sig-sign]').forEach(btn=>btn.addEventListener('click',()=>openSignModal(btn.dataset.sigSign)));
  pendingList.querySelectorAll('[data-sig-remind]').forEach(btn=>btn.addEventListener('click',()=>{
    const s = sigs.find(x=>x.id===btn.dataset.sigRemind);
    if(s){ showToast('Reminder sent to '+(findEmployee(s.signeeId)||{name:'signee'}).name); }
  }));

  const tbody = document.getElementById('signatures-tbody');
  tbody.innerHTML = sigs.slice().sort((a,b)=>b.requestedDate.localeCompare(a.requestedDate)).map(s=>{
    const e = findEmployee(s.signeeId);
    const cls = s.status==='Signed'?'sig-status-signed':s.status==='Declined'?'sig-status-declined':'sig-status-pending';
    return '<tr>'+
      '<td><span class="sig-doc-name">'+s.docName+'</span></td>'+
      '<td><div class="who-cell"><span class="avatar">'+initials(e?e.name:'?')+'</span><span class="name">'+(e?e.name:'Unknown')+'</span></div></td>'+
      '<td><span class="sig-doc-type-tag">'+s.docType+'</span></td>'+
      '<td style="font-size:12px;">'+formatDate(s.requestedDate)+'</td>'+
      '<td style="font-size:12px;">'+formatDate(s.deadline)+'</td>'+
      '<td><span class="status-pill '+cls+'"><span class="dot"></span>'+s.status+'</span></td>'+
      '<td>'+(s.status==='Signed'?'<span class="sig-complete-mark">✓ Signed '+formatDate(s.signedDate)+'</span>':s.status==='Pending'?'<button class="btn" style="font-size:11.5px;padding:5px 10px;" data-sig-sign2="'+s.id+'">Sign</button>':'')+'</td></tr>';
  }).join('') || '<tr><td colspan="7"><div class="empty-inline">No signature requests yet.</div></td></tr>';
  tbody.querySelectorAll('[data-sig-sign2]').forEach(btn=>btn.addEventListener('click',()=>openSignModal(btn.dataset.sigSign2)));
}

function openSigRequestModal(){
  const t = currentTenant();
  document.getElementById('sig-signee').innerHTML = t.employees.map(e=>'<option value="'+e.id+'">'+e.name+'</option>').join('');
  document.getElementById('sig-doc-name').value=''; document.getElementById('sig-doc-name').value='';
  const due = new Date(); due.setDate(due.getDate()+7);
  document.getElementById('sig-deadline').value = due.toISOString().slice(0,10);
  document.getElementById('sig-request-modal-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('sig-doc-name').focus(),50);
}
function closeSigRequestModal(){ document.getElementById('sig-request-modal-overlay').classList.remove('open'); }
function submitSigRequest(){
  if(blockIfReadOnly()) return;
  const t = currentTenant();
  const docName = document.getElementById('sig-doc-name').value.trim();
  const docType = document.getElementById('sig-doc-type').value;
  const signeeId = document.getElementById('sig-signee').value;
  const deadline = document.getElementById('sig-deadline').value;
  if(!docName){ showToast('Add a document name to continue'); return; }
  if(!t.signatureRequests) t.signatureRequests=[];
  const newId = 'SIG-'+t.key.toUpperCase()+'-'+Date.now();
  t.signatureRequests.unshift({ id:newId, docName, docType, signeeId, requestedDate:new Date().toISOString().slice(0,10), deadline, status:'Pending', signedDate:null });
  closeSigRequestModal();
  const e = findEmployee(signeeId);
  logActivity(t, 'Signature requested from '+(e?e.name:'employee')+': '+docName);
  pushNotification('You have a document to sign: '+docName, 'e-Signature');
  renderSignaturesPage();
  persistState();
  showToast('Signature request sent to '+(e?e.name:'employee'));
}

function openSignModal(sigId){
  const t = currentTenant();
  const s = (t.signatureRequests||[]).find(x=>x.id===sigId);
  if(!s) return;
  currentSigRequestId = sigId;
  const e = findEmployee(s.signeeId);
  document.getElementById('sig-sign-modal-title').textContent = 'Sign — '+s.docName;
  document.getElementById('sig-doc-preview').innerHTML =
    '<strong>'+s.docName+'</strong><br><span style="font-size:11.5px;color:var(--ink-faint);">'+s.docType+' · Requested by '+t.currentUser.name+' · Due '+formatDate(s.deadline)+'</span>'+
    '<hr style="border:none;border-top:1px solid var(--border);margin:12px 0;">'+
    '<p style="margin:0;">By signing this document I confirm that I have read, understood, and agree to its contents. This constitutes my legally binding electronic signature.</p>';
  document.getElementById('sig-confirm-name').value='';
  document.getElementById('sig-sign-modal-overlay').classList.add('open');
  initSignatureCanvas();
}
function closeSignModal(){ document.getElementById('sig-sign-modal-overlay').classList.remove('open'); currentSigRequestId=null; }

function initSignatureCanvas(){
  sigCanvas = document.getElementById('sig-canvas');
  sigCtx = sigCanvas.getContext('2d');
  sigCtx.clearRect(0,0,sigCanvas.width,sigCanvas.height);
  sigCtx.strokeStyle = '#1A2420';
  sigCtx.lineWidth = 2.5;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';
  sigDrawing = false;
  const getPos = (ev)=>{
    const r = sigCanvas.getBoundingClientRect();
    const scaleX = sigCanvas.width/r.width;
    const scaleY = sigCanvas.height/r.height;
    if(ev.touches){ return { x:(ev.touches[0].clientX-r.left)*scaleX, y:(ev.touches[0].clientY-r.top)*scaleY }; }
    return { x:(ev.clientX-r.left)*scaleX, y:(ev.clientY-r.top)*scaleY };
  };
  sigCanvas.onmousedown = sigCanvas.ontouchstart = (ev)=>{ ev.preventDefault(); sigDrawing=true; const p=getPos(ev); sigCtx.beginPath(); sigCtx.moveTo(p.x,p.y); };
  sigCanvas.onmousemove = sigCanvas.ontouchmove = (ev)=>{ ev.preventDefault(); if(!sigDrawing) return; const p=getPos(ev); sigCtx.lineTo(p.x,p.y); sigCtx.stroke(); };
  sigCanvas.onmouseup = sigCanvas.ontouchend = ()=>{ sigDrawing=false; };
  document.getElementById('sig-clear-canvas').onclick = ()=>{ sigCtx.clearRect(0,0,sigCanvas.width,sigCanvas.height); };
}

function submitSign(){
  if(!currentSigRequestId) return;
  const confirmedName = document.getElementById('sig-confirm-name').value.trim();
  if(!confirmedName){ showToast('Type your full name to confirm your signature'); return; }
  const blank = !sigCanvas || sigCtx.getImageData(0,0,sigCanvas.width,sigCanvas.height).data.every(v=>v===0||v===255);
  if(blank){ showToast('Please draw your signature in the box above'); return; }
  const t = currentTenant();
  const s = (t.signatureRequests||[]).find(x=>x.id===currentSigRequestId);
  if(!s) return;
  s.status = 'Signed';
  s.signedDate = new Date().toISOString().slice(0,10);
  closeSignModal();
  const e = findEmployee(s.signeeId);
  logActivity(t, (e?e.name:'Employee')+' signed: '+s.docName);
  pushNotification(s.docName+' was signed by '+(e?e.name:'the signee'), 'e-Signature');
  renderSignaturesPage();
  persistState();
  showToast(s.docName+' signed successfully');
}



/* ===================================================================== EVENTS */

document.querySelectorAll('.nav-item').forEach(item=>{
  item.addEventListener('click', ()=>{
    if(item.dataset.implemented === 'true'){
      goToPage(item.dataset.page);
      if(item.dataset.page === 'employees') renderEmployeesPage(false);
      if(item.dataset.page === 'leave'){ renderLeavePage(); renderLeavePolicyBtn(); }
      if(item.dataset.page === 'recruitment') renderRecruitPage();
      if(item.dataset.page === 'payroll') renderPayrollPage();
      if(item.dataset.page === 'performance') renderPerformancePage();
      if(item.dataset.page === 'reports') renderReportsPage();
      if(item.dataset.page === 'settings') renderSettingsPage();
      if(item.dataset.page === 'orgchart') renderOrgChart();
      if(item.dataset.page === 'notifications') renderNotifications();
      if(item.dataset.page === 'shifts') renderShifts();
      if(item.dataset.page === 'benefits') renderBenefitsPage();
      if(item.dataset.page === 'expenses') renderExpensesPage();
      if(item.dataset.page === 'assets') renderAssetsPage();
      if(item.dataset.page === 'learning') renderLearningPage();
      if(item.dataset.page === 'engagement') renderEngagementPage();
      if(item.dataset.page === 'servicedesk') renderServiceDeskPage();
      if(item.dataset.page === 'announcements') renderAnnouncementsPage();
      if(item.dataset.page === 'travel') renderTravelPage();
      if(item.dataset.page === 'onboarding') renderOnboardingPage();
      if(item.dataset.page === 'knowledge') renderKnowledgePage();
    } else {
      showToast('This module is part of the next build phase');
    }
  });
});

document.getElementById('hamburger').addEventListener('click', openSidebar);
document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

document.getElementById('tenant-btn').addEventListener('click', (ev)=>{
  ev.stopPropagation();
  tenantMenuOpen ? closeTenantMenu() : openTenantMenu();
});
document.addEventListener('click', (ev)=>{
  if(tenantMenuOpen && !ev.target.closest('.tenant-switch')) closeTenantMenu();
  if(!ev.target.closest('.row-menu-wrap')) closeAllRowMenus();
});

document.getElementById('theme-toggle').addEventListener('click', ()=>{
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  persistState();
});

document.getElementById('global-search').addEventListener('input', (ev)=>{
  state.filters.search = ev.target.value;
  if(state.page !== 'employees'){
    goToPage('employees');
    renderEmployeesPage(false);
  }
  document.getElementById('emp-search').value = state.filters.search;
  renderEmployeeTable();
});
document.getElementById('emp-search').addEventListener('input', (ev)=>{
  state.filters.search = ev.target.value;
  document.getElementById('global-search').value = state.filters.search;
  renderEmployeeTable();
});

document.querySelectorAll('.emp-table th.sortable').forEach(th=>{
  th.addEventListener('click', ()=>{
    const key = th.dataset.sort;
    if(state.sort.key === key){
      state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sort = { key, dir:'asc' };
    }
    renderEmployeeTable();
  });
});

document.getElementById('add-employee-btn').addEventListener('click', ()=> openAddModal());
document.getElementById('drawer-edit').addEventListener('click', ()=>{ if(state.drawerId) openAddModal(state.drawerId); });
document.getElementById('bulk-archive-btn').addEventListener('click', bulkArchiveSelected);
document.getElementById('bulk-export-btn').addEventListener('click', bulkExportSelected);
document.getElementById('bulk-clear-btn').addEventListener('click', clearBulkSelection);
document.getElementById('select-all-emp').addEventListener('change', (ev)=>{
  const visibleIds = filteredSortedEmployees().map(e=>e.id);
  if(ev.target.checked){
    visibleIds.forEach(id=>{ if(!state.bulkSelected.includes(id)) state.bulkSelected.push(id); });
  } else {
    state.bulkSelected = state.bulkSelected.filter(id=> !visibleIds.includes(id));
  }
  renderEmployeeTable();
});
document.getElementById('modal-close').addEventListener('click', closeAddModal);
document.getElementById('modal-cancel').addEventListener('click', closeAddModal);
document.getElementById('modal-submit').addEventListener('click', submitAddEmployee);
document.getElementById('modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='modal-overlay') closeAddModal(); });

document.getElementById('add-opening-btn').addEventListener('click', openOpeningModal);
document.getElementById('opening-modal-close').addEventListener('click', closeOpeningModal);
document.getElementById('opening-modal-cancel').addEventListener('click', closeOpeningModal);
document.getElementById('opening-modal-submit').addEventListener('click', submitOpening);
document.getElementById('opening-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='opening-modal-overlay') closeOpeningModal(); });

document.getElementById('candidate-modal-close').addEventListener('click', closeCandidateModal);
document.getElementById('candidate-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='candidate-modal-overlay') closeCandidateModal(); });
document.getElementById('add-candidate-note-btn').addEventListener('click', addCandidateNote);

document.getElementById('offer-modal-close').addEventListener('click', closeOfferModal);
document.getElementById('offer-modal-cancel').addEventListener('click', closeOfferModal);
document.getElementById('offer-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='offer-modal-overlay') closeOfferModal(); });
document.getElementById('offer-print-btn').addEventListener('click', ()=> window.print());

document.getElementById('view-careers-btn').addEventListener('click', openCareersView);
document.getElementById('careers-back-btn').addEventListener('click', closeCareersView);
document.getElementById('careers-apply-back').addEventListener('click', ()=> showCareersPane('roles'));
document.getElementById('careers-thanks-back').addEventListener('click', ()=>{ renderCareersRoles(); showCareersPane('roles'); });
document.getElementById('careers-submit-btn').addEventListener('click', submitCareersApplication);

/* Benefits */
document.getElementById('add-benefit-btn').addEventListener('click', openBenefitModal);
document.getElementById('benefit-modal-close').addEventListener('click', closeBenefitModal);
document.getElementById('benefit-modal-cancel').addEventListener('click', closeBenefitModal);
document.getElementById('benefit-modal-submit').addEventListener('click', submitBenefit);
document.getElementById('benefit-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='benefit-modal-overlay') closeBenefitModal(); });

/* Expenses */
document.getElementById('add-expense-btn').addEventListener('click', openExpenseModal);
document.getElementById('expense-modal-close').addEventListener('click', closeExpenseModal);
document.getElementById('expense-modal-cancel').addEventListener('click', closeExpenseModal);
document.getElementById('expense-modal-submit').addEventListener('click', submitExpense);
document.getElementById('expense-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='expense-modal-overlay') closeExpenseModal(); });
document.querySelectorAll('#expense-status-chips .chip').forEach(chip=>{
  chip.addEventListener('click', ()=> renderExpenseTable(chip.dataset.expenseStatus));
});

/* Assets */
document.getElementById('add-asset-btn').addEventListener('click', openAssetModal);
document.getElementById('asset-modal-close').addEventListener('click', closeAssetModal);
document.getElementById('asset-modal-cancel').addEventListener('click', closeAssetModal);
document.getElementById('asset-modal-submit').addEventListener('click', submitAsset);
document.getElementById('asset-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='asset-modal-overlay') closeAssetModal(); });
document.getElementById('asset-search').addEventListener('input', ev=>{ currentAssetSearch=ev.target.value; renderAssetsPage(); });
document.querySelectorAll('#asset-status-chips .chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{ currentAssetFilter=chip.dataset.assetStatus; renderAssetsPage(); });
});

/* Learning */
document.getElementById('add-course-btn').addEventListener('click', openCourseModal);
document.getElementById('course-modal-close').addEventListener('click', closeCourseModal);
document.getElementById('course-modal-cancel').addEventListener('click', closeCourseModal);
document.getElementById('course-modal-submit').addEventListener('click', submitCourse);
document.getElementById('course-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='course-modal-overlay') closeCourseModal(); });

/* Engagement */
document.getElementById('launch-survey-btn').addEventListener('click', openSurveyModal);
document.getElementById('survey-modal-close').addEventListener('click', closeSurveyModal);
document.getElementById('survey-modal-cancel').addEventListener('click', closeSurveyModal);
document.getElementById('survey-modal-submit').addEventListener('click', submitSurvey);
document.getElementById('survey-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='survey-modal-overlay') closeSurveyModal(); });
document.getElementById('give-recognition-btn').addEventListener('click', openRecognitionModal);
document.getElementById('recognition-modal-close').addEventListener('click', closeRecognitionModal);
document.getElementById('recognition-modal-cancel').addEventListener('click', closeRecognitionModal);
document.getElementById('recognition-modal-submit').addEventListener('click', submitRecognition);
document.getElementById('recognition-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='recognition-modal-overlay') closeRecognitionModal(); });

/* Service Desk */
document.getElementById('new-ticket-btn').addEventListener('click', openTicketModal);
document.getElementById('ticket-modal-close').addEventListener('click', closeTicketModal);
document.getElementById('ticket-modal-cancel').addEventListener('click', closeTicketModal);
document.getElementById('ticket-modal-submit').addEventListener('click', submitTicket);
document.getElementById('ticket-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='ticket-modal-overlay') closeTicketModal(); });
document.querySelectorAll('#ticket-filter-chips .chip').forEach(chip=>{
  chip.addEventListener('click', ()=>{ currentTicketFilter=chip.dataset.ticketFilter; renderTicketList(); });
});

/* Announcements */
document.getElementById('new-announcement-btn').addEventListener('click', openAnnouncementModal);
document.getElementById('announcement-modal-close').addEventListener('click', closeAnnouncementModal);
document.getElementById('announcement-modal-cancel').addEventListener('click', closeAnnouncementModal);
document.getElementById('announcement-modal-submit').addEventListener('click', submitAnnouncement);
document.getElementById('announcement-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='announcement-modal-overlay') closeAnnouncementModal(); });

/* Travel */
document.getElementById('new-travel-btn').addEventListener('click', openTravelModal);
document.getElementById('travel-modal-close').addEventListener('click', closeTravelModal);
document.getElementById('travel-modal-cancel').addEventListener('click', closeTravelModal);
document.getElementById('travel-modal-submit').addEventListener('click', submitTravel);
document.getElementById('travel-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='travel-modal-overlay') closeTravelModal(); });

/* Onboarding */
document.getElementById('start-onboarding-btn').addEventListener('click', openOnboardingModal);
document.getElementById('onboarding-modal-close').addEventListener('click', closeOnboardingModal);
document.getElementById('onboarding-modal-cancel').addEventListener('click', closeOnboardingModal);
document.getElementById('onboarding-modal-submit').addEventListener('click', submitOnboarding);
document.getElementById('onboarding-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='onboarding-modal-overlay') closeOnboardingModal(); });

/* Knowledge Base */
document.getElementById('new-article-btn').addEventListener('click', openArticleModal);
document.getElementById('article-modal-close').addEventListener('click', closeArticleModal);
document.getElementById('article-modal-cancel').addEventListener('click', closeArticleModal);
document.getElementById('article-modal-submit').addEventListener('click', submitArticle);
document.getElementById('article-modal-overlay').addEventListener('click', ev=>{ if(ev.target.id==='article-modal-overlay') closeArticleModal(); });
document.getElementById('knowledge-search').addEventListener('input', ev=>{ currentKBSearch=ev.target.value; renderKnowledgePage(); });

document.getElementById('add-goal-btn').addEventListener('click', openGoalModal);
document.getElementById('goal-modal-close').addEventListener('click', closeGoalModal);
document.getElementById('goal-modal-cancel').addEventListener('click', closeGoalModal);
document.getElementById('goal-modal-submit').addEventListener('click', submitGoal);
document.getElementById('goal-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='goal-modal-overlay') closeGoalModal(); });
document.getElementById('new-cycle-btn').addEventListener('click', ()=>{
  if(confirm('Start a new review cycle? This archives the current cycle\'s results and resets everyone to Not started.')) startNewReviewCycle();
});

document.getElementById('scorecard-modal-close').addEventListener('click', closeScorecardModal);
document.getElementById('scorecard-cancel').addEventListener('click', closeScorecardModal);
document.getElementById('scorecard-submit').addEventListener('click', submitScorecard);
document.getElementById('scorecard-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='scorecard-modal-overlay') closeScorecardModal(); });

document.getElementById('policy-modal-close').addEventListener('click', closePolicyModal);
document.getElementById('policy-cancel').addEventListener('click', closePolicyModal);
document.getElementById('policy-submit').addEventListener('click', submitPolicy);
document.getElementById('policy-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='policy-modal-overlay') closePolicyModal(); });

document.getElementById('shift-modal-close').addEventListener('click', closeShiftModal);
document.getElementById('shift-modal-cancel').addEventListener('click', closeShiftModal);
document.getElementById('shift-modal-submit').addEventListener('click', submitShift);
document.getElementById('shift-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='shift-modal-overlay') closeShiftModal(); });

document.getElementById('mark-all-read-btn').addEventListener('click', markAllNotificationsRead);
document.getElementById('publish-shifts-btn').addEventListener('click', publishShifts);
document.getElementById('shifts-prev-btn').addEventListener('click', ()=>{ state.shiftWeekOffset--; renderShifts(); });
document.getElementById('shifts-next-btn').addEventListener('click', ()=>{ state.shiftWeekOffset++; renderShifts(); });
document.getElementById('shifts-dept-filter').addEventListener('change', ()=> renderShifts());
document.getElementById('orgchart-dept-filter').addEventListener('change', (ev)=>{ state.orgChartDeptFilter = ev.target.value; renderOrgChart(); });

document.getElementById('candidate-search').addEventListener('input', (ev)=>{
  state.candidateSearch = ev.target.value;
  renderKanban();
});

document.getElementById('run-payroll-btn').addEventListener('click', runPayroll);
document.getElementById('payslip-close').addEventListener('click', closePayslip);
document.getElementById('payslip-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='payslip-overlay') closePayslip(); });
document.getElementById('ps-apply-adjust-btn').addEventListener('click', applyPayslipAdjustment);
document.getElementById('payslip-print-btn').addEventListener('click', printPayslip);

document.getElementById('review-modal-close').addEventListener('click', closeReviewModal);
document.getElementById('review-modal-cancel').addEventListener('click', closeReviewModal);
document.getElementById('review-modal-submit').addEventListener('click', submitReviewRating);
document.getElementById('review-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='review-modal-overlay') closeReviewModal(); });

document.getElementById('invite-modal-close').addEventListener('click', closeInviteModal);
document.getElementById('invite-modal-cancel').addEventListener('click', closeInviteModal);
document.getElementById('invite-modal-submit').addEventListener('click', submitInvite);
document.getElementById('invite-modal-overlay').addEventListener('click', (ev)=>{ if(ev.target.id==='invite-modal-overlay') closeInviteModal(); });
document.querySelectorAll('#star-picker button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    state.reviewModalStars = Number(btn.dataset.star);
    document.querySelectorAll('#star-picker button').forEach(b=>{
      b.classList.toggle('selected', Number(b.dataset.star) <= state.reviewModalStars);
    });
  });
});

document.getElementById('export-csv-btn').addEventListener('click', exportReportCSV);

document.getElementById('drawer-close').addEventListener('click', closeDrawer);
document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.drawer-tab').forEach(t=>t.classList.toggle('active', t===tab));
    document.querySelectorAll('.drawer-pane').forEach(p=>p.classList.toggle('active', p.id==='pane-'+tab.dataset.tab));
  });
});

document.getElementById('bell-btn').addEventListener('click', ()=>{ goToPage('notifications'); renderNotifications(); });
document.getElementById('go-shifts-btn').addEventListener('click', ()=>{ goToPage('shifts'); renderShifts(); });
document.getElementById('signout-topbar-btn').addEventListener('click', ()=>{
  document.getElementById('shell').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-hint').textContent = '';
  document.getElementById('login-mark').style.background = currentTenant().accent;
});
document.getElementById('plan-pill').addEventListener('click', ()=>{
  goToPage('settings');
  state.settingsTab = 'billing';
  renderSettingsPage();
});
document.getElementById('user-chip').addEventListener('click', ()=>{
  goToPage('settings');
  state.settingsTab = 'general';
  renderSettingsPage();
});
document.getElementById('user-chip').addEventListener('contextmenu', (ev)=>{
  ev.preventDefault();
  if(confirm('Sign out of ' + currentTenant().shortName + '?')){
    document.getElementById('shell').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-hint').textContent = '';
    document.getElementById('login-mark').style.background = currentTenant().accent;
  }
});

document.addEventListener('keydown', (ev)=>{
  if(ev.key === 'Escape'){
    closeDrawer();
    closeAddModal();
    closeOpeningModal();
    closePayslip();
    closeReviewModal();
    closeInviteModal();
    closeCandidateModal();
    closeOfferModal();
    closeGoalModal();
    closeScorecardModal();
    closePolicyModal();
    closeShiftModal();
    closeBenefitModal();
    closeExpenseModal();
    closeAssetModal();
    closeCourseModal();
    closeSurveyModal();
    closeRecognitionModal();
    closeTicketModal();
    closeAnnouncementModal();
    closeTravelModal();
    closeOnboardingModal();
    closeArticleModal();
    closeTenantMenu();
    closeAllRowMenus();
  }
});

/* ===================================================================== LOGIN */

const DEMO_ACCOUNTS = {
  'patricia@kampalaridgehospital.org': 'krh',
  'brian@nilelogistics.co.ug': 'nlc',
  'diana@equatormfb.co.ug': 'emb'
};

function showLoginHint(msg){ document.getElementById('login-hint').textContent = msg; }

function signIn(email, password, tenantOverride){
  const emailLow = (email||'').toLowerCase().trim();
  if(!emailLow || (!password && !tenantOverride)){
    showLoginHint('Enter your email and password to continue.');
    return;
  }
  const tenantKey = tenantOverride || DEMO_ACCOUNTS[emailLow];
  if(!tenantKey){
    showLoginHint("We don't recognise that email. Try one of the demo accounts below.");
    return;
  }
  if(!tenantOverride && !password){
    showLoginHint('Enter a password to continue.');
    return;
  }
  state.tenant = tenantKey;
  state.filters = { search:'', department:'All', status:'All' };
  state.sort = { key:'name', dir:'asc' };
  state.empLoaded = false;
  state.bulkSelected = [];
  state.recruitFilter = null;
  state.candidateSearch = '';
  state.reportTab = 'workforce';
  state.reportDateFrom = '';
  state.reportDateTo = '';
  state.settingsTab = 'general';
  applyTenantTheme(currentTenant());
  renderTenantMenu();
  renderDashboard();
  renderEmployeesPage(false);
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('shell').style.display = 'flex';
  showToast('Welcome back, ' + currentTenant().currentUser.name.split(' ')[0]);
}

document.getElementById('login-submit').addEventListener('click', ()=>{
  signIn(
    document.getElementById('login-email').value,
    document.getElementById('login-password').value
  );
});

document.getElementById('login-password').addEventListener('keydown', (ev)=>{
  if(ev.key === 'Enter') document.getElementById('login-submit').click();
});
document.getElementById('login-email').addEventListener('keydown', (ev)=>{
  if(ev.key === 'Enter') document.getElementById('login-password').focus();
});

document.querySelectorAll('.login-demo-row').forEach(row=>{
  row.addEventListener('click', ()=>{
    document.getElementById('login-email').value = row.dataset.demoEmail;
    document.getElementById('login-password').value = 'demo';
    signIn(row.dataset.demoEmail, 'demo', row.dataset.demoTenant);
  });
});

/* ===================================================================== DATE RANGE & PDF */

document.getElementById('report-date-from').addEventListener('change', (ev)=>{
  state.reportDateFrom = ev.target.value;
  renderReportBody();
});
document.getElementById('report-date-to').addEventListener('change', (ev)=>{
  state.reportDateTo = ev.target.value;
  renderReportBody();
});
document.getElementById('report-date-clear').addEventListener('click', ()=>{
  state.reportDateFrom = '';
  state.reportDateTo = '';
  document.getElementById('report-date-from').value = '';
  document.getElementById('report-date-to').value = '';
  renderReportBody();
});
document.getElementById('export-pdf-btn').addEventListener('click', exportReportPDF);
document.getElementById('save-report-btn').addEventListener('click', saveCurrentReport);

/* ===================================================================== INIT */

setupReviews();
await loadPersistedState();

Object.values(TENANTS).forEach(t=> seedNotifications(t));

document.getElementById('shell').style.display = 'none';
document.getElementById('login-screen').style.display = 'flex';
document.getElementById('login-mark').style.background = currentTenant().accent;

})();
