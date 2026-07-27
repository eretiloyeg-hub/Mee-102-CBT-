import { Question } from '../types';

export const MEE102_QUESTIONS: Question[] = [
  // SECTION A: FITTING
  {
    id: "mee-1",
    category: "Fitting",
    questionText: "The assembly of components parts of an equipment or a machine is called?",
    options: ["Fitting", "Bench work", "Fixing", "Sheet metal work"],
    correctIndex: 0,
    explanation: "Fitting refers to the hand operations involved in assembling, aligning, and fitting together component parts of machines."
  },
  {
    id: "mee-2",
    category: "Fitting",
    questionText: "Sheet metal can be cut using the following tools EXCEPT?",
    options: ["Snips", "Vice", "Hacksaw", "Guillotine"],
    correctIndex: 1,
    explanation: "A Vice is a work-holding device, not a metal cutting tool."
  },
  {
    id: "mee-3",
    category: "Fitting",
    questionText: "Hacksaw blade is made of?",
    options: ["Carbon or High Speed Steel", "Hardened Steel", "Forged Steel", "High Carbon Steel"],
    correctIndex: 0,
    explanation: "Hacksaw blades are commonly manufactured from High Speed Steel (HSS) or Carbon Steel for high wear resistance."
  },
  {
    id: "mee-4",
    category: "Fitting",
    questionText: "Chisels are made of?",
    options: ["Hardened Steel", "High Speed Steel", "Forged High Carbon Steel", "High Grade Steel"],
    correctIndex: 2,
    explanation: "Cold chisels are forged from High Carbon Steel or chrome-vanadium steel to withstand heavy impact."
  },
  {
    id: "mee-5",
    category: "Fitting",
    questionText: "Taps are used for making external thread?",
    options: ["True", "A&B", "False", "None of the above"],
    correctIndex: 2,
    explanation: "False: Taps are used for cutting internal threads in a hole. Dies are used for external threads."
  },
  {
    id: "mee-6",
    category: "Fitting",
    questionText: "Which of the following is used to determine the type of hammer?",
    options: ["Point", "Wedges", "Pein", "Eye"],
    correctIndex: 2,
    explanation: "Hammers are classified according to the shape of their pein (e.g. Ball pein, Cross pein, Straight pein)."
  },
  {
    id: "mee-7",
    category: "Fitting",
    questionText: "Files are made of?",
    options: ["High Speed Steel", "Hardened Stainless Steel", "Hardened Mild Steel", "Hardened High Grade Steel"],
    correctIndex: 3,
    explanation: "Files are made of high carbon or high grade tool steel, which is hardened and tempered."
  },
  {
    id: "mee-8",
    category: "Fitting",
    questionText: "Rivets are not permanent mechanical fasteners.",
    options: ["None of the above", "False", "True", "All of the above"],
    correctIndex: 0,
    explanation: "Rivets are permanent fasteners because removing them requires destroying the rivet head."
  },
  {
    id: "mee-9",
    category: "Fitting",
    questionText: "Anvil is made of?",
    options: ["Forged steel", "Hardened Mild Steel", "High Speed steel", "Mild Steel"],
    correctIndex: 1,
    explanation: "Anvils are constructed with a cast iron or mild steel body topped with a hardened steel working face."
  },
  {
    id: "mee-10",
    category: "Fitting",
    questionText: "Which of the following is not a typical part of a file?",
    options: ["Point", "Shoulder", "Eye", "Face"],
    correctIndex: 2,
    explanation: "The 'Eye' is a part of a hammer head where the handle enters, not a file component."
  },
  {
    id: "mee-11",
    category: "Fitting",
    questionText: "The following are marking out tools EXCEPT?",
    options: ["Punch", "Scriber", "Try Square", "File"],
    correctIndex: 3,
    explanation: "A file is a material removal/shaping tool, whereas Punch, Scriber, and Try Square are marking/layout tools."
  },
  {
    id: "mee-12",
    category: "Fitting",
    questionText: "Which of the following is not a method of filing?",
    options: ["Draw filing", "Finish filing", "Start filing", "Cross filing"],
    correctIndex: 2,
    explanation: "Standard filing techniques include cross filing, draw filing, and finish filing. 'Start filing' is not a technical term."
  },
  {
    id: "mee-13",
    category: "Fitting",
    questionText: "Heavy duty type of power driven guillotine can be used to cut 12 mm steel plate.",
    options: ["True", "False", "All of the above", "None of the above"],
    correctIndex: 0,
    explanation: "Heavy industrial power guillotines are capable of shearing thick metal plates up to 12mm or more."
  },
  {
    id: "mee-14",
    category: "Fitting",
    questionText: "When production is carried out with the use of machine tools, it is referred to as?",
    options: ["Machine tools", "Lathe cutting", "Bench work", "None of the above"],
    correctIndex: 2,
    explanation: "In traditional workshop classification, machine tool processing complements manual bench work."
  },
  {
    id: "mee-15",
    category: "Fitting",
    questionText: "The drilled hole in riveting operation must not be larger than the rivet to allow the rivet expand when formed.",
    options: ["True", "False", "All of the above", "None of the above"],
    correctIndex: 1,
    explanation: "False: The hole must be slightly larger than the nominal diameter of the rivet shank to allow insertion and radial expansion during riveting."
  },
  {
    id: "mee-16",
    category: "Fitting",
    questionText: "The depth of a blind hole can be accurately determined by?",
    options: ["Vernier Caliper", "Measuring tape", "Steel rule", "Micrometer screw gauge"],
    correctIndex: 0,
    explanation: "A Vernier Caliper features a built-in depth gauge stem specifically designed for measuring depth of blind holes."
  },
  {
    id: "mee-17",
    category: "Fitting",
    questionText: "The following information can be obtained on sequence of operation EXCEPT?",
    options: ["Tools used", "Operation performed", "Materials of those parts", "The risk involved in each operation"],
    correctIndex: 3,
    explanation: "A standard process/operation routing sheet specifies tools, operations, and materials; risk assessments belong to safety safety analysis cards."
  },
  {
    id: "mee-18",
    category: "Fitting",
    questionText: "To produce a bolt on the fitters bench you need?",
    options: ["Die", "Surface plate", "Micrometer screw gauge", "Tap"],
    correctIndex: 0,
    explanation: "A Die is used for cutting external threads onto cylindrical rods to make bolts/screws."
  },
  {
    id: "mee-19",
    category: "Fitting",
    questionText: "The hammer used for light work to avoid damage to the surface of such component is called?",
    options: ["Soft hammer", "Sledge hammer", "Straight pein", "Ball Pein hammer"],
    correctIndex: 0,
    explanation: "Soft hammers (made of brass, rubber, wood, or raw hide) prevent denting finished metal surfaces."
  },
  {
    id: "mee-20",
    category: "Fitting",
    questionText: "The screw of a fitter's bench vice is made of which thread?",
    options: ["Square or buttress threads", "Ball pein", "Die", "Tap"],
    correctIndex: 0,
    explanation: "Bench vice lead screws use Square or Acme/Buttress threads for transmitting heavy clamping force."
  },
  {
    id: "mee-21",
    category: "Fitting",
    questionText: "An operation whereby a cylindrical pin with head is used to fasten two or more plates together is called?",
    options: ["Welding operation", "Cross cutting operation", "Riveting operation", "Chipping and chiseling operation"],
    correctIndex: 2,
    explanation: "Riveting uses cylindrical pins (rivets) with pre-formed heads to clamp metal plates permanently."
  },
  {
    id: "mee-22",
    category: "Fitting",
    questionText: "Which of the following is a marking out tool?",
    options: ["Micrometer screw gauge", "Engineer Square", "Steel rule", "Electrode holder"],
    correctIndex: 1,
    explanation: "An Engineer's Square is used to scribe perpendicular lines during layout/marking out."
  },
  {
    id: "mee-23",
    category: "Fitting",
    questionText: "The smaller hole found on the top surface of an anvil is called?",
    options: ["Pinch hole", "Process hole", "Punch hole", "Flat surface"],
    correctIndex: 2,
    explanation: "The small round hole on an anvil face is called the punch hole (or pritchel hole), used for punching holes in hot metal."
  },
  {
    id: "mee-24",
    category: "Fitting",
    questionText: "To effectively carry out chiseling and chipping operation by a fitter you need chisel and?",
    options: ["Snip", "Mallet", "Die stock", "Hammer"],
    correctIndex: 3,
    explanation: "A hammer strikes the head of the cold chisel to drive it through metal."
  },
  {
    id: "mee-25",
    category: "Fitting",
    questionText: "The parts of a hacksaw which enable the tensioning of the blade is called?",
    options: ["Wing Nut", "But and Square nut", "Square thread", "Pin"],
    correctIndex: 1,
    explanation: "The wing nut or square nut on the hacksaw frame adjusts tension on the blade pins."
  },
  {
    id: "mee-26",
    category: "Fitting",
    questionText: "What is the effect of pinning in filing operation?",
    options: ["Lively easy cut", "Loss of cutting efficiency of the file", "Blow hole", "Dead smooth"],
    correctIndex: 3,
    explanation: "Pinning causes scratches on the workpiece surface and can leave a smooth non-cutting face or defect if pins stick."
  },
  {
    id: "mee-27",
    category: "Fitting",
    questionText: "To effectively hold a tool for cutting internal thread, you need?",
    options: ["Tap Wrench", "Pliers", "Die stock", "Ring spanner"],
    correctIndex: 0,
    explanation: "A Tap Wrench holds and turns hand taps when cutting internal threads."
  },
  {
    id: "mee-28",
    category: "Fitting",
    questionText: "The followings are bench work and fitting auxiliary tools EXCEPT?",
    options: ["Tee- Block", "Set of spanner", "Wire brush", "Vee- block"],
    correctIndex: 3,
    explanation: "Vee-blocks are work holding / precision marking support blocks, whereas spanners, brushes are auxiliary hand tools."
  },
  {
    id: "mee-29",
    category: "Fitting",
    questionText: "……………….. is a hard fibrous tissue found in many plants.",
    options: ["Wood", "Fibre cellulose", "Cell walls", "Cellulose"],
    correctIndex: 0,
    explanation: "Wood is the structural, hard fibrous tissue found in trees and plants."
  },
  {
    id: "mee-30",
    category: "Fitting",
    questionText: "Why is it that calipers cannot be used for direct measurement?",
    options: ["Too small for the purpose", "Too large for the purpose", "It is not calibrated", "For accuracy purpose"],
    correctIndex: 2,
    explanation: "Simple calipers (inside/outside) have no graduated scale, so measurement must be transferred to a steel rule."
  },
  {
    id: "mee-31",
    category: "Fitting",
    questionText: "Which of the following is a work holding device?",
    options: ["Anvil", "Bench Vice", "Screw driver", "Fitters bench"],
    correctIndex: 1,
    explanation: "A Bench Vice clamps workpieces rigidly during bench operations."
  },
  {
    id: "mee-32",
    category: "Fitting",
    questionText: "……………………. Is generally obtained from a tree with deciduous or broad leaves.",
    options: ["Shisham", "Hardwood", "Softwood", "Bonded wood"],
    correctIndex: 1,
    explanation: "Hardwood comes from angiosperm (broad-leaved) deciduous trees."
  },
  {
    id: "mee-33",
    category: "Fitting",
    questionText: "........................................... is used for cutting sheet metals of various nature and thickness.",
    options: ["Cutting blade", "Snip", "Anvil", "Tube cutter"],
    correctIndex: 1,
    explanation: "Hand snips (tin shears) are used to cut thin sheet metal manually."
  },
  {
    id: "mee-34",
    category: "Fitting",
    questionText: "The type of vice for holding tapered workpiece is called ............................ vice.",
    options: ["Swift Rig", "Tap Wrench", "Swivel", "Tail stock"],
    correctIndex: 2,
    explanation: "Swivel jaws on specialized bench vices allow holding irregular or tapered components securely."
  },
  {
    id: "mee-35",
    category: "Fitting",
    questionText: "According to roughness …………...…file is excellent for hard metals.",
    options: ["First cut", "All", "First and second cut", "Second cut"],
    correctIndex: 3,
    explanation: "Second-cut files have medium pitch teeth suitable for harder metals and finishing."
  },
  {
    id: "mee-36",
    category: "Fitting",
    questionText: "Which of the following is not a type of file according to roughness?",
    options: ["Straight", "Smooth", "Bastard", "Second cut"],
    correctIndex: 0,
    explanation: "Files by roughness are Rough, Bastard, Second cut, Smooth, and Dead smooth. 'Straight' is not a cut grade."
  },
  {
    id: "mee-37",
    category: "Fitting",
    questionText: "The blade of a hacksaw can be made of?",
    options: ["High carbon steel", "Nickel-alloy steel", "Carbon steel", "Forged steel"],
    correctIndex: 2,
    explanation: "Hacksaw blades are commonly made from low alloy carbon steel or HSS."
  },
  {
    id: "mee-38",
    category: "Fitting",
    questionText: "Which of the following is not a part of a hacksaw?",
    options: ["Frame", "Peg", "Wing nut", "Handle"],
    correctIndex: 1,
    explanation: "A peg is not an integral structural part of a hacksaw assembly (pins/prongs hold the blade)."
  },
  {
    id: "mee-39",
    category: "Fitting",
    questionText: "One of these is an example of Pin punches EXCEPT?",
    options: ["Tapered", "Dot", "Centre", "Tap"],
    correctIndex: 0,
    explanation: "Dot and Centre punches are conical point layout punches, not tapered drift pin punches."
  },
  {
    id: "mee-40",
    category: "Fitting",
    questionText: "Conversion of tree into a timber or wood log is called?",
    options: ["Seasoning", "Salten", "Felling", "Cracking"],
    correctIndex: 2,
    explanation: "Felling is the process of cutting down trees to produce timber."
  },

  // SECTION B: AUTOMOBILE
  {
    id: "mee-131",
    category: "Automobile",
    questionText: "The main two types of internal combustion engine are?",
    options: ["Spark ignition and compression ignition", "Spark ignition and compressor ignition", "Press ignition and compression ignition", "Start ignition and compression ignition"],
    correctIndex: 0,
    explanation: "Internal combustion engines are primarily categorized as Spark Ignition (petrol/gasoline) or Compression Ignition (diesel)."
  },
  {
    id: "mee-132",
    category: "Automobile",
    questionText: "The following are the maintenance activities carried out regularly on an automobile except?",
    options: ["Checking of oil level in the sump", "Checking the water/coolant level", "Removal of spark plugs", "Washing of the car"],
    correctIndex: 2,
    explanation: "Removing spark plugs is a periodic repair or tuning task, not a daily/routine fluid check maintenance."
  },
  {
    id: "mee-133",
    category: "Automobile",
    questionText: "----------------- switches the current to the spark plug through the ignition coil on and off.",
    options: ["Contact-breaker", "Battery", "Alternator", "Generator"],
    correctIndex: 0,
    explanation: "The contact-breaker (breaker points) periodically opens and closes the primary ignition circuit."
  },
  {
    id: "mee-134",
    category: "Automobile",
    questionText: "--------------------- is necessary to ensure that vehicles operation remains unaltered or is restored to its original state.",
    options: ["Cleaning", "De-carbonization", "Lubrication", "Maintenance"],
    correctIndex: 3,
    explanation: "Maintenance encompasses all routine actions taken to keep automotive components operating reliably."
  },
  {
    id: "mee-135",
    category: "Automobile",
    questionText: "------------------- is used to measure the specific gravity of battery electrolyte.",
    options: ["Hygrometer", "Pyrometer", "Hydrometer", "Thermometer"],
    correctIndex: 2,
    explanation: "A Hydrometer measures the density/specific gravity of liquids like lead-acid battery electrolyte."
  },
  {
    id: "mee-137",
    category: "Automobile",
    questionText: "---------------------- produces power in a car.",
    options: ["Vehicle", "Engine", "Motor", "Machine"],
    correctIndex: 1,
    explanation: "The Engine converts chemical heat energy from fuel into mechanical power."
  },
  {
    id: "mee-138",
    category: "Automobile",
    questionText: "The carrier of electrons in the battery is called----------------",
    options: ["Water", "Acid", "Fuel", "Electrolyte"],
    correctIndex: 3,
    explanation: "Electrolyte (sulfuric acid solution) conducts ions between positive and negative lead plates."
  },
  {
    id: "mee-140",
    category: "Automobile",
    questionText: "Replacement of worn out part in the engine is called------------------",
    options: ["Maintenance", "Service", "Overhauling", "Repair"],
    correctIndex: 2,
    explanation: "Engine overhaul involves dismantling, inspecting, and replacing worn internal components."
  },
  {
    id: "mee-141",
    category: "Automobile",
    questionText: "------------ uses spark plug for the ignition of explosive mixture of fuel and air?",
    options: ["Diesel engine", "Petrol engine", "Kerosene engine", "Power engine"],
    correctIndex: 1,
    explanation: "Petrol (gasoline) engines rely on electric spark plugs to ignite compressed air-fuel mixture."
  },
  {
    id: "mee-144",
    category: "Automobile",
    questionText: "Another name for a diesel engine is-------------",
    options: ["Spark ignition engine", "Compressor ignition engine", "Fuel ignition engine", "Compression ignition engine"],
    correctIndex: 3,
    explanation: "Diesel engines ignite fuel solely via heat generated by high air compression (CI engine)."
  },
  {
    id: "mee-145",
    category: "Automobile",
    questionText: "The electrolyte of a fully charged battery has the specific gravity value of approximately?",
    options: ["1.408", "1.480", "1.840", "1.804"],
    correctIndex: 2,
    explanation: "Pure concentrated sulfuric acid has a specific gravity around 1.840."
  },
  {
    id: "mee-147",
    category: "Automobile",
    questionText: "-------------- holds the brake pad in the vehicle's braking system.",
    options: ["Brake Caliper", "Brake disc", "Brake Fluid", "Clutch disk"],
    correctIndex: 0,
    explanation: "The Brake Caliper houses hydraulic pistons and holds brake friction pads against the rotor."
  },
  {
    id: "mee-149",
    category: "Automobile",
    questionText: "--------------- is used to charge the battery in the vehicle.",
    options: ["Generator", "Commutator", "Alternator", "Selector"],
    correctIndex: 2,
    explanation: "The Alternator converts mechanical rotation into AC current (rectified to DC) to charge the battery while running."
  },
  {
    id: "mee-151",
    category: "Automobile",
    questionText: "---------- convert kinetic energy possessed by the vehicle into heat energy by means of friction.",
    options: ["Tyre", "Gear", "Clutch", "Brake"],
    correctIndex: 3,
    explanation: "Brakes slow down vehicles by converting kinetic energy into thermal energy via friction."
  },
  {
    id: "mee-152",
    category: "Automobile",
    questionText: "The valve that opens during induction stroke is called---------------",
    options: ["Inlet valve", "Exhaust Valve", "Opening Valve", "Outlet Valve"],
    correctIndex: 0,
    explanation: "The Inlet (intake) valve opens during the induction stroke to draw fresh air-fuel charge."
  },
  {
    id: "mee-154",
    category: "Automobile",
    questionText: "--------------- transforms the low voltage into high voltage needed to discharge across the spark plug gap as a spark.",
    options: ["Ignition coil", "Alternator coil", "Distributor coil", "Battery"],
    correctIndex: 0,
    explanation: "The Ignition coil acts as a step-up transformer converting 12V battery voltage up to 20,000+ volts."
  },
  {
    id: "mee-156",
    category: "Automobile",
    questionText: "-------------- is used to store water in the vehicle for cooling the engine.",
    options: ["Water pump", "Radiator", "Regulator", "Water reservoir"],
    correctIndex: 1,
    explanation: "The Radiator stores engine coolant and dissipates heat to surrounding airflow."
  },
  {
    id: "mee-157",
    category: "Automobile",
    questionText: "-------------- links the piston to the crankshaft.",
    options: ["Connecting Shaft", "Connecting Bolt", "Connecting Pin", "Connecting rod"],
    correctIndex: 3,
    explanation: "The Connecting rod bridges the piston gudgeon pin to the crankshaft crankpin."
  },
  {
    id: "mee-158",
    category: "Automobile",
    questionText: "--------------- produces initial impetus to set the engine in motion.",
    options: ["Starter motor", "Flywheel", "Camshaft", "Key"],
    correctIndex: 0,
    explanation: "The electric Starter motor turns the flywheel ring gear to crank the engine on ignition."
  },

  // SECTION C: REFRIGERATION & AIR CONDITIONING
  {
    id: "mee-271",
    category: "Refrigeration & AC",
    questionText: "Which of the following is an example of halogenated refrigerant?",
    options: ["C3H8", "NH3", "CCl2F2", "H2O"],
    correctIndex: 2,
    explanation: "CCl2F2 (Dichlorodifluoromethane / R-12) contains halogen elements chlorine and fluorine."
  },
  {
    id: "mee-272",
    category: "Refrigeration & AC",
    questionText: "Heat exchanger that removes heat from the hot refrigerant vapour and changes its phase back to liquid is?",
    options: ["Evaporator", "Expander", "Refrigerant", "Condenser"],
    correctIndex: 3,
    explanation: "The Condenser extracts thermal energy from high pressure vapor refrigerant to condense it back into liquid."
  },
  {
    id: "mee-273",
    category: "Refrigeration & AC",
    questionText: "A system which can be used to achieve lower temperature than the surroundings is called?",
    options: ["Refrigerator", "Air-conditioning", "Refrigeration", "Compressor"],
    correctIndex: 2,
    explanation: "Refrigeration is the thermodynamic process of absorbing heat from a low-temperature space and discharging it to a warmer surrounding."
  },
  {
    id: "mee-274",
    category: "Refrigeration & AC",
    questionText: "Refrigerating effect in the refrigerating system can be obtained from device called?",
    options: ["Evaporator", "Evaporative cooling", "Evaporative Heating", "Evaporating Medium"],
    correctIndex: 0,
    explanation: "The Evaporator coil absorbs ambient heat from the target space as liquid refrigerant boils inside."
  },
  {
    id: "mee-275",
    category: "Refrigeration & AC",
    questionText: "The component in the Refrigeration system that is responsible for raising both the pressure and temperature of refrigerant vapour is called?",
    options: ["Compression", "Expansion", "Compressor", "Evaporator"],
    correctIndex: 2,
    explanation: "The Compressor draws low pressure vapor and compresses it into high pressure, high temperature vapor."
  },
  {
    id: "mee-276",
    category: "Refrigeration & AC",
    questionText: "An instrument mostly used in refrigeration and air-conditioning service is?",
    options: ["Vernier Caliper", "Dividing head", "Try square", "Manifold gauge"],
    correctIndex: 3,
    explanation: "A Manifold gauge set monitors high and low system pressures during charging and diagnostic service."
  },
  {
    id: "mee-278",
    category: "Refrigeration & AC",
    questionText: "……………….. is regarded as the best/most sensitive method of detecting leakage in all refrigerating systems.",
    options: ["Electronic leakage detector", "Soap bubble method", "Halide torch method", "Sulphur candle method"],
    correctIndex: 0,
    explanation: "Electronic leak detectors can sense minute refrigerant concentration leaks down to parts per million."
  },
  {
    id: "mee-280",
    category: "Refrigeration & AC",
    questionText: "Which of the following is NOT part of compressor?",
    options: ["Suction port", "Discharge port", "Charging port", "Release port"],
    correctIndex: 3,
    explanation: "Compressors feature suction, discharge, and service/charging connections, but no 'release port'."
  },
  {
    id: "mee-281",
    category: "Refrigeration & AC",
    questionText: "……………… is a process of cooling a hot metal very quickly.",
    options: ["Quenching", "Normalizing", "Aging", "Annealing"],
    correctIndex: 0,
    explanation: "Quenching involves rapid immersion of hot steel in oil or water to form hard martensite."
  },

  // SECTION D: MACHINING
  {
    id: "mee-431",
    category: "Machining",
    questionText: "………………… is a precision instrument which is used for measuring thickness and diameter of a workpiece.",
    options: ["Vernier caliper", "Micrometer screw gauge", "Precision steel rule", "Protractor head"],
    correctIndex: 2,
    explanation: "Precision rules and micrometers measure dimensions; high precision rules yield direct readings."
  },
  {
    id: "mee-433",
    category: "Machining",
    questionText: "The ability of a material to resist indentation or deformation is?",
    options: ["Ductility", "Toughness", "Hardness", "True fracture strength"],
    correctIndex: 1,
    explanation: "Hardness is the property that resists surface indentation, scratching, and abrasive wear."
  },
  {
    id: "mee-435",
    category: "Machining",
    questionText: "……………………….. is used to cool the cutting tool and the workpiece.",
    options: ["Milky solution", "Cutting fluid", "Oil", "Grease"],
    correctIndex: 2,
    explanation: "Cutting oil and water-soluble oils act as cutting fluids to dissipate heat and lubricate cutting edges."
  },
  {
    id: "mee-437",
    category: "Machining",
    questionText: "The following operations can be performed on the lathe EXCEPT?",
    options: ["Screw Cutting", "Taper Turning", "Knurling", "Gear Cutting"],
    correctIndex: 0,
    explanation: "Gear cutting requires specialized gear hobbing or dividing head milling setups, not standard lathes."
  },
  {
    id: "mee-447",
    category: "Machining",
    questionText: "The work holding device on Lathe machine is mounted on the?",
    options: ["Carriage", "Spindle", "Compound slide", "Cross slide"],
    correctIndex: 1,
    explanation: "Chucks, faceplates, and drive plates mount directly onto the lathe headstock spindle snout."
  },

  // SECTION E: WELDING
  {
    id: "mee-567",
    category: "Welding",
    questionText: "The devices used to ensure uniform accuracy in mass production/fabrication is called?",
    options: ["Gangs & Steadies", "Machine Vice and Clamp holder", "Jigs and fixtures", "All of the above"],
    correctIndex: 2,
    explanation: "Jigs and Fixtures hold components accurately and guide tooling during repetitive mass production."
  },
  {
    id: "mee-568",
    category: "Welding",
    questionText: "The function of a flux in welding is to prevent?",
    options: ["Corrosion", "Oxidation", "Heat loss", "All of the above"],
    correctIndex: 1,
    explanation: "Flux reacts with impurities and shields liquid metal against atmospheric oxygen and oxidation."
  },
  {
    id: "mee-574",
    category: "Welding",
    questionText: "What type of joint is achieved by welding?",
    options: ["Fixed", "Temporary", "Permanent", "Welded"],
    correctIndex: 2,
    explanation: "Welding coalesces parent metals to produce permanent non-dismountable joints."
  },
  {
    id: "mee-575",
    category: "Welding",
    questionText: "What is the full meaning of TIG welding?",
    options: ["Titanium Iodine Gas", "Tantalum Inert Gas", "Tungsten Iodine Gas", "Tungsten Inert Gas"],
    correctIndex: 3,
    explanation: "TIG stands for Tungsten Inert Gas (GTAW - Gas Tungsten Arc Welding)."
  },
  {
    id: "mee-585",
    category: "Welding",
    questionText: "What is the full meaning of MIG in welding?",
    options: ["Magnesium Iodine Gas", "Metallic Inert Gas", "Manganese Inert Gas", "Molecular Inert Gas"],
    correctIndex: 1,
    explanation: "MIG stands for Metal Inert Gas welding (GMAW)."
  }
];
