import { db } from "@/db";
import {
  practiceTests,
  testModules,
  questions,
  choices,
  moduleQuestions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const TEST_SLUG = "2025-december-practice-test";

type ChoiceInput = { label: "A" | "B" | "C" | "D"; body: string };

type QuestionInput = {
  type: "multiple_choice" | "student_response";
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  stimulus?: string;
  stem: string;
  explanation: string;
  choices?: ChoiceInput[];
  correctLabel?: "A" | "B" | "C" | "D";
  correctResponse?: string;
};

// ---------------------------------------------------------------------------
// Reading & Writing — Module 1 (27 questions)
// ---------------------------------------------------------------------------

const RW_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "easy",
    stimulus:
      "The following text is from Mark Twain's 1876 novel The Adventures of Tom Sawyer. Tom, a child, has been told by his aunt to paint their house's fence.\n\nTom appeared on the sidewalk with a bucket of whitewash and a long-handled brush. He surveyed the fence, and all gladness left him and a deep melancholy settled down upon his spirit. Thirty yards of board fence nine feet high.",
    stem: 'As used in the text, what does the word "surveyed" most nearly mean?',
    choices: [
      { label: "A", body: "Transformed" },
      { label: "B", body: "Organized" },
      { label: "C", body: "Examined" },
      { label: "D", body: "Guaranteed" },
    ],
    correctLabel: "C",
    explanation: "Tom's gladness vanishing as he looks over the fence shows him examining the size of the task ahead.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Zygomorphic (bilaterally symmetric) flowers remain open and functional on average 1.1 days longer than actinomorphic (radially symmetric) flowers do. Ruby E. Stephens and colleagues claim that this extended period could be ______ the relatively small pool of potential pollinators available to zygomorphic flowers and the greater chance at successful pollination that remaining open affords them.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "attributed to" },
      { label: "B", body: "converted by" },
      { label: "C", body: "analogous to" },
      { label: "D", body: "magnified by" },
    ],
    correctLabel: "A",
    explanation: "The extended open period is explained as a response to (i.e. attributed to) the small pollinator pool.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      'The influence of William Shakespeare\'s writings is clear in a vast range of subsequent literary works and is similarly ______ in many works in other media, from fine art (such as Edward Alcock\'s painting Portia and Shylock) to popular music (such as the band the Lumineers\' song "Ophelia").',
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "excessive" },
      { label: "B", body: "unusual" },
      { label: "C", body: "apparent" },
      { label: "D", body: "subtle" },
    ],
    correctLabel: "C",
    explanation: 'Paired with "clear," the influence being "similarly" visible in other media matches "apparent."',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Mastering 'ajami, a Syrian art of creating intricately painted wood panels, demands a skill set that ______ innate talent: crafting the panels requires not just the ability to draw but also an understanding of traditional techniques, materials, and design elements, necessitating expertise gained through dedicated guidance from experienced artisans.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "restrains" },
      { label: "B", body: "replicates" },
      { label: "C", body: "characterizes" },
      { label: "D", body: "transcends" },
    ],
    correctLabel: "D",
    explanation: 'The colon explains that mastery requires "not just" drawing ability "but also" more — the needed skill set goes beyond (transcends) mere innate talent.',
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "Philip Hayes Dean's award–winning play The Sty of the Blind Pig was produced in 1971 by the groundbreaking Negro Ensemble Company (NEC). NEC cofounder Douglas Turner Ward, who worked as an actor, director, and playwright, had met actor and producer Robert Hooks while they were performing in a 1960 touring production of Lorraine Hansberry's play A Raisin in the Sun. Together, they envisioned a theater company that would nurture and showcase the work of Black theater professionals. Since NEC's founding in 1967, its workshops and performances have given Black playwrights, including Dean, a forum for their compelling stories.",
    stem: 'Which choice best describes the function of the underlined sentence in the text as a whole? (The underlined portion reads: "Since NEC\'s founding in 1967, its workshops and performances have given Black playwrights, including Dean, a forum for their compelling stories.")',
    choices: [
      { label: "A", body: "It provides additional information about a person mentioned in the text." },
      { label: "B", body: "It explains the circumstances that led to the formation of the theater company discussed in the text." },
      { label: "C", body: "It emphasizes the ongoing significance of the theater company discussed in the text." },
      { label: "D", body: "It illustrates the widespread influence of a play discussed earlier in the text." },
    ],
    correctLabel: "C",
    explanation: "Describing NEC's continued impact on playwrights since 1967 underscores that the company still matters today.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "The following text is from Rachel Heng's 2023 novel The Great Reclamation. Ah Boon is fishing off the coast of Singapore.\n\nWhen he pulled up the nets, they contained only one kind of fish—black pomfrets, the flat diamonds of their bodies slick in the morning light. This uniformity did not surprise him; over the years, he'd learned that the waters here were temperamental. They could be relied upon for a good catch, but from time to time threw up only prawns or squid, and other times colorful varieties of fish that weren't even supposed to be found in this region. He'd grown to accept the unpredictability, embracing it as a game to be played, like the reading of tea leaves or the grooves of a palm.",
    stem: 'Taken together, the three underlined portions most clearly serve which function in the text as a whole? (The underlined portions read: "black pomfrets," "prawns or squid," and "colorful varieties of fish.")',
    choices: [
      { label: "A", body: "They illustrate the changeable nature of the fishing grounds where Ah Boon is." },
      { label: "B", body: "They underscore Ah Boon's lack of surprise at seeing sea creatures that aren't usually found in the region." },
      { label: "C", body: "They provide examples of what Ah Boon most frequently catches in the area." },
      { label: "D", body: "They emphasize the wide variety of sea creatures that Ah Boon has caught on this particular fishing trip." },
    ],
    correctLabel: "A",
    explanation: "The three different catches (pomfrets, prawns/squid, colorful fish) together demonstrate how unpredictable and changeable the waters are.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "hard",
    stimulus:
      "When a landscape with native megafaunal (large–bodied) mammalian herbivores experiences a substantial decline in those populations, it loses a functional component of plant ecology. Introducing non-native proxy species has been beneficial in some such cases, but the reasonable concern persists that ecosystems may be negatively affected by species that didn't coevolve with local vegetation. Scholarly analysis of findings from 221 studies revealed no evidence that nativeness mediates the ecological effects of megafauna, however, determining instead that other traits, such as diet selectivity, are more germane.",
    stem: 'Which choice best states the function of the underlined portion in the text as a whole? (The underlined portion reads: "Scholarly analysis of findings from 221 studies revealed no evidence that nativeness mediates the ecological effects of megafauna, however,")',
    choices: [
      { label: "A", body: "It outlines the reasoning behind the claim about a benefit that is presented in the previous sentence." },
      { label: "B", body: "It presents an insight suggesting that a concern acknowledged as sensible earlier in the text is unsubstantiated." },
      { label: "C", body: "It explains why data do not show the expected pattern described at the beginning of the text." },
      { label: "D", body: "It identifies an inconclusive finding that motivated a shift in the focus of an analysis discussed in the text." },
    ],
    correctLabel: "B",
    explanation: "The 221-study finding shows nativeness doesn't matter ecologically, undercutting the earlier acknowledged concern about non-native species.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Given the immense scope of space, the search for extraterrestrial life is almost necessarily concentrated on the exoplanets deemed to have the most plausible chance of success—typically, atmosphere-bearing terrestrial planets orbiting within a certain range of their stars (termed the habitable zone). Claiming that Earth experienced a long transition from single–lid to plate tectonics that accelerated the emergence and evolution of complex organisms, researchers Robert J. Stern and Taras V. Gerya hold that consideration of tectonics, an often overlooked factor, could help further narrow the search for advanced extraterrestrial species.",
    stem: "Based on the text, what do Stern and Gerya most likely believe about the development of complex life on exoplanets?",
    choices: [
      { label: "A", body: "It is more likely to occur if habitable zone planets with atmospheres transition from single–lid to plate tectonics late in their history than if the transition occurs early in their history." },
      { label: "B", body: "It is probably more dependent on the presence of plate tectonics than on orbital distance from a host star or the presence of an atmosphere." },
      { label: "C", body: "It is more likely to occur on habitable zone planets with atmospheres and plate tectonics than on otherwise similar planets that lack plate tectonics." },
      { label: "D", body: "It is unlikely unless the transition from single–lid to plate tectonics occurs before the acquisition of a lasting atmosphere." },
    ],
    correctLabel: "C",
    explanation: "Since plate tectonics accelerated complex life on Earth, Stern and Gerya would expect the same advantage on similarly habitable exoplanets that also have plate tectonics.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Quality assessments of concrete typically focus almost exclusively on compressive strength as a measure of durability, overlooking other potentially relevant factors. Lisa Ptacek et al. therefore investigated the potential of gas permeability (vulnerability to incursion by gases), which is caused in part by excessive porosity, as a durability indicator. Their measurements and observations revealed that quality of conditions during the concrete curing phase negatively correlates with gas permeability and that high gas permeability values are associated with increased deterioration as concrete surfaces age.",
    stem: "Information in the text best supports which statement about Ptacek et al.'s findings?",
    choices: [
      { label: "A", body: "They suggest that gas permeability testing presents a more reliable indication of concrete durability than compressive strength testing does." },
      { label: "B", body: "They bolster the claim that concrete's susceptibility to damage decreases as its gas permeability increases." },
      { label: "C", body: "They call into question the idea that quality of curing conditions directly affects concrete gas permeability but is unrelated to compressive strength." },
      { label: "D", body: "They indicate that evaluation of gas permeability is an appropriate addition to concrete quality assessment procedures." },
    ],
    correctLabel: "D",
    explanation: "Since gas permeability links to curing quality and deterioration, it's a useful factor to add to durability assessments alongside compressive strength.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "The Wonderful Wizard of Oz is a 1900 novel by L. Frank Baum. In the novel, Dorothy, who is from Kansas, finds herself in an unfamiliar place called Oz. Kansas is presented as being less appealing than Oz, as is clear when ______.",
    stem: "Which quotation from The Wonderful Wizard of Oz most effectively illustrates the claim?",
    choices: [
      { label: "A", body: 'the narrator states, "Once more they could see farms built beside the road; but these were painted green, and when they came to a small house, in which a farmer evidently lived, that also was painted green."' },
      { label: "B", body: 'a character says to others, "But it will take more than imagination to carry Dorothy back to Kansas, and I\'m sure I don\'t know how it can be done."' },
      { label: "C", body: 'the narrator states, "When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side."' },
      { label: "D", body: 'a character says to Dorothy, "I cannot understand why you should wish to leave this beautiful country and go back to the dry, gray place you call Kansas."' },
    ],
    correctLabel: "D",
    explanation: 'Directly calling Oz "beautiful" and Kansas "dry, gray" is the clearest explicit comparison favoring Oz.',
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Average Hours Worked per Person per Year in 1950 and 2017\nCountry | 1950 | 2017 | Change in hours | Percent change in hours\nNorway | 2,129 | 1,417 | –712 | –33%\nAustralia | 2,178 | 1,731 | –447 | –21%\nColombia | 2,323 | 1,998 | –325 | –14%\nMexico | 2,432 | 2,255 | –177 | –7%\n\nCalculations may be inexact due to rounding.\nA student in an economics course is examining the decline since 1950 in average hours worked per person per year in various nations due to both increased productivity and the adoption of policies that limit working hours. The student researches how the decline in Australia compares to that in ______.",
    stem: "Which choice most effectively uses data from the table to complete the student's conclusion?",
    choices: [
      { label: "A", body: "the percent decrease in hours worked was greater in Australia than it was in Norway, Colombia, or Mexico." },
      { label: "B", body: "though the decline in number of hours worked in Australia was less than that in Norway and Mexico, it was greater than that in Colombia." },
      { label: "C", body: "while the number of hours worked rose in Australia between 1950 and 2017, it declined in Norway, Colombia, and Mexico." },
      { label: "D", body: "though the decline in number of hours worked in Australia was not as great as that in Norway, it was greater than that in Colombia and Mexico." },
    ],
    correctLabel: "D",
    explanation: "Australia's decline (–447) is smaller than Norway's (–712) but larger than Colombia's (–325) and Mexico's (–177).",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Minimum and Maximum Depths of Stony Coral Species in Caribbean and Indo-Pacific Waters\nSpecies | Location | Minimum depth (m) | Maximum depth (m)\nAcropora awi | Indo-Pacific | 0 | 5\nIndophyllia macassarensis | Indo-Pacific | 20 | 25\nIsophyllia rigida | Caribbean | 3 | 20\nScolymia cubensis | Caribbean | 10 | 92\n\nA marine biologist is researching four stony coral species in Caribbean and Indo-Pacific waters, focusing on sightings of these species in the shallow zone (less than 30 meters below the surface) and the mesophotic zone (30 to 150 meters below the surface). Consulting the table, she notes that the smallest maximum depth is located in ______.",
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      { label: "A", body: "Indo-Pacific waters in the mesophotic zone." },
      { label: "B", body: "Caribbean waters in the shallow zone." },
      { label: "C", body: "Caribbean waters in the mesophotic zone." },
      { label: "D", body: "Indo-Pacific waters in the shallow zone." },
    ],
    correctLabel: "D",
    explanation: "Acropora awi has the smallest maximum depth (5 m) of the four species — Indo-Pacific waters, and 5 m is within the shallow zone.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      'Rafael Núñez and colleagues studied how members of the Yupno, an Indigenous group in Papua New Guinea, conceptualize time in both spoken language and gestures. The researchers recorded Yupno speakers explaining certain temporal words and phrases, such as kalip bishap, a past-oriented expression that translates to "past times," and coded each speaker\'s manual gestures. Previous research has found a tendency in many cultures to make temporal distinctions along imagined linear axes: for instance, Spanish speakers often refer to the left/right axis to describe events in time. Some researchers believe this tendency is universal, but Núñez and colleagues claim this is not the case.',
    stem: "Which finding, if true, would most directly support Núñez and colleagues' claim?",
    choices: [
      { label: "A", body: "Yupno speakers typically use their left hand to make temporal gestures regardless of whether the gestures are past oriented or future oriented." },
      { label: "B", body: "Some Yupno grammatical structures used when talking about time are also used in Spanish." },
      { label: "C", body: "Future-oriented gestures used by Yupno speakers do not, on average, point in the opposite linear direction of past-oriented gestures." },
      { label: "D", body: "Yupno speakers were observed making temporal gestures both indoors and outdoors, though with greater frequency when indoors." },
    ],
    correctLabel: "C",
    explanation: "Yupno gestures not following an opposite linear axis for past vs. future directly contradicts the claim that linear-axis time gestures are universal.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      "The 1980 production of A Lesson from Aloes was the first Broadway show for which Susan Hilferty was credited as a costume designer. Hilferty was among the Broadway costume designers interviewed by Sara Jablon–Roberts and Eulanda A. Sanders for their study of historical accuracy in costume design. They argue that aesthetics often outweigh fidelity to the past among designers for shows with historical settings. In a paper for a theater class, a student claims that the costume design for a modern production of the musical Our Town (set in the early 1900s) exemplifies this tendency.",
    stem: "Which quotation from the costume designer for the modern production of Our Town would most effectively support the student's claim?",
    choices: [
      { label: "A", body: "\"In trying to create the period look of Our Town, I had to make some practical compromises, such as substituting cooler modern fabrics for historically accurate woolens so that the actors didn't overheat.\"" },
      { label: "B", body: "\"For Our Town, I decided not to include the extra fabric that would have been typical of clothing in the period because it made the costumes unappealingly bulky.\"" },
      { label: "C", body: "\"The clothing of the period of Our Town is aesthetically appealing but largely unfamiliar to today's audiences, so minor deviations from historical accuracy largely went unnoticed.\"" },
    ],
    correctLabel: "B",
    explanation: "Choosing to skip period-accurate fabric bulk purely because it looked unappealing is a clear case of aesthetics overriding historical fidelity.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      'Studies have shown that when we listen to high–tempo music (songs with a high number of beats per minute, or bpm) during endurance exercise, we perceive our effort as lower than it actually is, which leads to an increased pace and a higher heart rate. Researchers recently designed a follow–up study in which participants jogged outdoors for 30 minutes while listening to Aerosmith\'s "Livin\' on the Edge" (169 bpm) continuously. The next day, participants performed the same activity while listening to Ella Fitzgerald\'s "From This Moment On" (93 bpm). As expected, listening to that song resulted in participants ______.',
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "perceiving their effort as lower while jogging than they had the previous day." },
      { label: "B", body: "varying their jogging pace more than they had the previous day." },
      { label: "C", body: "exhibiting a higher average heart rate while jogging than they had the previous day." },
      { label: "D", body: "jogging a shorter distance in the 30 minutes than they had the previous day." },
    ],
    correctLabel: "D",
    explanation: "Lower-tempo music should reduce perceived effort less, lowering pace and heart rate — meaning less distance covered than on the high-tempo day.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Cycads are palmlike plants with cones. ______ plants were abundant throughout the Mesozoic Era (66 to 252 million years ago).",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "This" },
      { label: "B", body: "Each" },
      { label: "C", body: "That" },
      { label: "D", body: "These" },
    ],
    correctLabel: "D",
    explanation: 'The plural noun "plants" needs the plural demonstrative "These," referring back to cycads.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "The theory of plate tectonics explains how large pieces of Earth's crust, called tectonic plates, move and interact. According to the theory, the movement of tectonic plates forms ______ creates volcanoes, and causes earthquakes.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "mountains," },
      { label: "B", body: "mountains" },
      { label: "C", body: "mountains;" },
      { label: "D", body: "mountains:" },
    ],
    correctLabel: "A",
    explanation: 'This is a three-item list ("forms mountains, creates volcanoes, and causes earthquakes"), so a comma follows the first item.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "While conducting an interview for her book Latina Authors and Their Muses, editor Mayra Calvani asked Reyna Grande, author of the novel The Distance Between Us, what ______ Grande's response was The House on Mango Street by Sandra Cisneros.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "her favorite book was?" },
      { label: "B", body: "was her favorite book?" },
      { label: "C", body: "was her favorite book!" },
      { label: "D", body: "her favorite book was." },
    ],
    correctLabel: "D",
    explanation: "This is an indirect (embedded) question, so it needs declarative word order and a period, not a question mark.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      'Many folktales that originate in the Hindi language start with a phrase that roughly translates to "in one era." Many tales that originate in English use "once upon a time." Such phrases, known as story starters, ______ from language to language.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "has varied" },
      { label: "B", body: "is varying" },
      { label: "C", body: "varies" },
      { label: "D", body: "vary" },
    ],
    correctLabel: "D",
    explanation: 'The plural subject "phrases" requires the plural present-tense verb "vary."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      "In the book A Theory of Harmony (1985), Swiss musicologist Ernst Levy argued that every chord has an opposite that can be substituted for it. For example, a pianist could replace the II7 chord while improvising, ______ chord is a given chord's opposite can be determined using a music visualization tool called the circle of fifths.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "improvising, which" },
      { label: "B", body: "improvising which" },
      { label: "C", body: "improvising and which" },
      { label: "D", body: "improvising, Which" },
    ],
    correctLabel: "A",
    explanation: 'A comma sets off the nonrestrictive clause introduced by "which," which needs a lowercase relative pronoun mid-sentence.',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "On a chilly spring morning in a Virginia park, as sunlight crested the treetops, Kathrin Swoboda raised her Nikon D500 camera and captured an image that would win the Grand Prize in the 2019 Audubon Photography Awards: a red-winged blackbird, exhaling what appeared to be rings of smoke. ______ the \"smoke\" was actually the blackbird's breath hitting the cold morning air as the bird sang.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Therefore," },
      { label: "B", body: "For example," },
      { label: "C", body: "Furthermore," },
      { label: "D", body: "Of course," },
    ],
    correctLabel: "D",
    explanation: 'The sentence supplies the obvious, common-sense explanation for the "smoke," matching "Of course."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "Vanadium is one of a variety of potentially useful trace elements contained in the chemical-rich brine that remains after seawater is purified through desalination. However, routine extraction of vanadium and other such elements from brine is not yet technologically or economically feasible. ______ most trace elements have only been extracted from seawater on an experimental basis.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "To date," },
      { label: "B", body: "In doing so," },
      { label: "C", body: "Finally," },
      { label: "D", body: "Similarly," },
    ],
    correctLabel: "A",
    explanation: 'Describing the current, still-experimental state of extraction matches the temporal transition "To date."',
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      'While researching a topic, a student has taken the following notes:\n• A synthesis reaction is a type of chemical reaction.\n• In a synthesis reaction, two or more substances combine to form a new substance.\n• When sodium and chloride combine, they form a substance called sodium chloride.\n• This substance is more commonly known as table salt.\n\nThe student wants to define the term "synthesis reaction."',
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "A synthesis reaction is a chemical reaction in which two or more substances combine to form a new substance." },
      { label: "B", body: "A new substance is formed when a chemical reaction combines sodium and chloride." },
      { label: "C", body: "The substance sodium chloride, also known as table salt, is formed by a chemical reaction." },
      { label: "D", body: "When sodium and chloride combine, they form a substance commonly known as table salt." },
    ],
    correctLabel: "A",
    explanation: "Only this choice gives the general definition of \"synthesis reaction\" rather than details about one specific example.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      'While researching a topic, a student has taken the following notes:\n• Documentary TV programs in the slow TV genre consist of uninterrupted broadcasts of ordinary events in real time.\n• MORA: Zeichner is a German slow TV program.\n• The 45-minute-long program documented an artist making a pencil drawing during a train journey.\n• It first aired in 2016.\n• Slow TV has been called "the world\'s most boring television."\n• American journalist Nathan Heller praises it, writing that "it affords a visceral kind of armchair tourism."\n\nThe student wants to use a quotation to refute the claim that slow TV programs are boring.',
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "With broadcasts of ordinary events, like artists at work, occurring in real time, slow TV just might be \"the world's most boring television.\"" },
      { label: "B", body: "Far from boring, slow TV programs can provide a \"visceral kind of armchair tourism,\" as Heller puts it, whereby viewers can watch artists at work in real time." },
      { label: "C", body: "MORA: Zeichner can afford a \"visceral kind of armchair tourism,\" as Heller puts it." },
      { label: "D", body: "While some have praised slow TV for affording \"a visceral kind of armchair tourism,\" others have called it \"the world's most boring television.\"" },
    ],
    correctLabel: "B",
    explanation: "Only this choice frames Heller's quotation as an explicit rebuttal (\"Far from boring\") to the boredom claim.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The Great Salt Lake in Utah is one of the world's saltiest bodies of water.\n• The northern portion of the lake has a higher concentration of salt than the southern portion.\n• Aquatic insects called Ephydra cinerea live in the southern portion.\n• Bacteria called Nodularia live in the southern portion.\n\nThe student wants to emphasize a difference between Ephydra cinerea and Nodularia.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Ephydra cinerea and Nodularia both live in the Great Salt Lake's southern portion." },
      { label: "B", body: "The northern portion of the Great Salt Lake has a higher concentration of salt than does the southern portion." },
      { label: "C", body: "Ephydra cinerea are aquatic insects that live in the southern portion of the Great Salt Lake." },
      { label: "D", body: "Ephydra cinerea and Nodularia are different types of organisms: Ephydra cinerea are aquatic insects, whereas Nodularia are bacteria." },
    ],
    correctLabel: "D",
    explanation: "Only this choice states the actual difference — insects versus bacteria — between the two organisms.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Extravehicular activities (EVAs) are activities performed outside a spacecraft by astronauts in outer space.\n• EVAs are also known as spacewalks.\n• Jerry Ross is a former US astronaut who has performed 9 spacewalks.\n• The total time of Ross's spacewalks was 58 hours and 32 minutes.\n• Francisco Rubio is a US astronaut who has performed 3 spacewalks.\n• The total time of Rubio's spacewalks was 21 hours and 24 minutes.\n\nThe student wants to emphasize a similarity between the astronauts Ross and Rubio.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Ross has performed spacewalks, but Rubio has performed EVAs." },
      { label: "B", body: "Ross and Rubio have each performed multiple spacewalks." },
      { label: "C", body: "Rubio has spent less time performing spacewalks than Ross has." },
      { label: "D", body: "EVAs, also known as spacewalks, are activities done by astronauts outside a spacecraft." },
    ],
    correctLabel: "B",
    explanation: "Only this choice highlights what Ross and Rubio share — each has performed multiple spacewalks.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Letters from a Peruvian Woman (1747) is an epistolary novel by French author Françoise de Graffigny.\n• Epistolary novels are novels written primarily as a series of fictional documents.\n• These documents can be letters, journal entries, newspaper clippings, and more.\n• Letters from a Peruvian Woman consists primarily of letters.\n• The letters are sent between a captured Incan princess and her fiancé.\n\nThe student wants to provide an example of an epistolary novel.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "An epistolary novel is a novel written primarily as a series of fictional documents, such as letters, journal entries, or newspaper clippings." },
      { label: "B", body: "It was Françoise de Graffigny who published the novel Letters from a Peruvian Woman in 1747." },
      { label: "C", body: "In 1747, French author Françoise de Graffigny published a novel of letters sent between a captured Incan princess and her fiancé." },
      { label: "D", body: "Consisting primarily of letters sent between a captured Incan princess and her fiancé, Françoise de Graffigny's Letters from a Peruvian Woman is an epistolary novel." },
    ],
    correctLabel: "D",
    explanation: "Only this choice both names a specific novel and explicitly labels it as an epistolary novel, providing the requested example.",
  },
];

// ---------------------------------------------------------------------------
// Reading & Writing — Module 2 (27 questions)
// ---------------------------------------------------------------------------

const RW_MODULE_2: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The following text is adapted from Jhumpa Lahiri's 2003 novel The Namesake. Gogol is an elementary school student in Massachusetts.\n\nIn art class, his favorite hour of the week, he carves his name with paper clips into the bottoms of clay cups and bowls. He pastes uncooked pasta to cardboard, and leaves his signature in fat brush strokes below paintings.",
    stem: 'As used in the text, what does the word "leaves" most nearly mean?',
    choices: [
      { label: "A", body: "Lifts" },
      { label: "B", body: "Allows" },
      { label: "C", body: "Switches" },
      { label: "D", body: "Writes" },
    ],
    correctLabel: "D",
    explanation: 'Leaving "his signature in fat brush strokes" describes the act of writing his name.',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Several scholars of children's literature recently ______ to discuss the work of Jerry Pinkney, illustrator of such lauded books as The Talking Eggs: A Folktale from the American South. Once together, they talked about his style, influences, and themes.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "cited" },
      { label: "B", body: "stipulated" },
      { label: "C", body: "convened" },
      { label: "D", body: "ascribed" },
    ],
    correctLabel: "C",
    explanation: '"Once together" confirms the scholars gathered, matching "convened."',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The following text is from Thomas Hardy's 1874 novel Far from the Madding Crowd. Bathsheba and Liddy are traveling down a road when Liddy points out a neighbor whom Bathsheba hasn't met yet.\n\nLiddy looked. \"That! That's Farmer Boldwood—of course 'tis—the man you couldn't see the other day when he called.\"\n\n\"Oh, Farmer Boldwood,\" murmured Bathsheba, and looked at him as he outstripped them. The farmer had never turned his head once, but with eyes fixed on the most advanced point along the road, passed as unconsciously and abstractedly as if Bathsheba and her charms were thin air.",
    stem: 'As used in the text, what does the phrase "most advanced" most nearly mean?',
    choices: [
      { label: "A", body: "Most developed" },
      { label: "B", body: "Brightest" },
      { label: "C", body: "Most novel" },
      { label: "D", body: "Farthest" },
    ],
    correctLabel: "D",
    explanation: "Fixing his eyes ahead on the road while never turning his head describes looking at the farthest visible point.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      'Though Vasily Grossman\'s novel Stalingrad is not as beloved as his later work Everything Flows, some critics commend it despite its mangling by Soviet censors: Marcel Theroux in The Guardian called it "lucid and readable." Several draft versions have been ______, and translators consulted those drafts when working on what they hoped would be a definitive English edition.',
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "assigned" },
      { label: "B", body: "debunked" },
      { label: "C", body: "preserved" },
      { label: "D", body: "hypothesized" },
    ],
    correctLabel: "C",
    explanation: "Translators being able to consult the drafts means the drafts were preserved.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "easy",
    stimulus:
      "How does the friction between different surfaces and a rolling object affect the speed of the object? One way to explore this question is to use the scientific method. This method involves forming a hypothesis, conducting an experiment, collecting data, and drawing a conclusion. Using the scientific method helps us understand how things work and helps us answer questions, such as the one about friction and a rolling object.",
    stem: "Which choice best describes the main purpose of the text?",
    choices: [
      { label: "A", body: "To criticize an experiment scientists conducted about friction and a rolling object" },
      { label: "B", body: "To explain one way to answer the question about friction and a rolling object" },
      { label: "C", body: "To summarize two sides of a scientific debate" },
      { label: "D", body: "To describe the career of a famous scientist" },
    ],
    correctLabel: "B",
    explanation: "The text presents the scientific method as one way to investigate the friction question posed at the start.",
  },
  {
    type: "multiple_choice",
    topic: "Cross-Text Connections",
    difficulty: "hard",
    stimulus:
      "Text 1\nThomas Piketty's book Capital in the Twenty-First Century has a more rigorous structure than its sequel, Capital and Ideology. While the first book's chapters all contribute to bolstering a clear, coherent argument about income inequality, the second book's digressions on subjects such as the history of vegetarian diets in India do not just make the book tedious but also muddy its reasoning.\n\nText 2\nCapital and Ideology has different aims than Piketty's earlier books. It should be judged not just in the context of Piketty's previous work but placed next to books like Robert Burton's Anatomy of Melancholy, in which the stated theme of the varieties of melancholy is mainly an excuse for a polymath to map his own mind. Even when sections do not explicitly support the central thesis, they link to each other in intriguing ways. None of them should be considered extraneous.",
    stem: "Based on the texts, which choice best describes a difference in how the authors of Text 1 and Text 2 view Capital and Ideology?",
    choices: [
      { label: "A", body: "The author of Text 1 finds the claim that Capital and Ideology resembles the work of Robert Burton to be dubious, while the author of Text 2 believes there is sufficient evidence to substantiate the claim." },
      { label: "B", body: "The author of Text 1 thinks that Capital and Ideology does not entirely succeed in its attempt to make a single coherent argument, while the author of Text 2 contends that making such an argument is not the book's ambition." },
      { label: "C", body: "The author of Text 1 thinks that the structure of Capital and Ideology makes it a less well-written book than Capital in the Twenty-First Century, while the author of Text 2 thinks that the structure of Capital and Ideology is why it is superior to Capital in the Twenty-First Century." },
    ],
    correctLabel: "B",
    explanation: "Text 1 faults the book's digressions for muddying its argument; Text 2 argues the book was never trying to make one single coherent argument in the first place.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "easy",
    stimulus:
      "What is a city? The answer depends on where you live! Many countries define an area as a city based on how many people live there. However, not every country uses the same numbers. Greenland defines a city as an area with a population of at least 200, while Switzerland defines a city as having a minimum population of 10,000. Some countries even define cities using other factors, like if there is a local government.",
    stem: "Which choice best states the main topic of the text?",
    choices: [
      { label: "A", body: "The number of small towns in Greenland" },
      { label: "B", body: "What some people enjoy about cities" },
      { label: "C", body: "How different countries define what a city is" },
      { label: "D", body: "The country of Switzerland" },
    ],
    correctLabel: "C",
    explanation: "The whole text discusses varying national definitions of a city, making that the main topic.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "Animals use many objects as tools to achieve goals more easily. Such goals include grooming, finding food, and protecting themselves. For a long time, people thought tool use was unique to primates. Elephants and other animals, though, have busted the myth that tool use requires hands. Inventively, elephants use branches to scratch themselves. Woodpecker finches also get creative. They use cactus spines to pry insects from hiding places.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      { label: "A", body: "Unlike primates, elephants are exceptionally skillful at using different tools." },
      { label: "B", body: "Contrary to long-held beliefs, primates aren't the only animals to use tools." },
      { label: "C", body: "There are many myths about tool use that researchers are starting to challenge." },
      { label: "D", body: "Animals find it difficult to use objects as tools." },
    ],
    correctLabel: "B",
    explanation: "The text's central point, illustrated by elephants and woodpecker finches, is that the old belief limiting tool use to primates is false.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "easy",
    stimulus:
      "River | Length (km)\nYangtze River | 6,236\nOb River | 5,525\nCongo River | 5,118\nZambezi River | 2,574\n\nResearchers Shaochuang Liu and team presented updated measurement of the lengths of several rivers.",
    stem: "According to the table, which river is the longest?",
    choices: [
      { label: "A", body: "Zambezi River" },
      { label: "B", body: "Snake River" },
      { label: "C", body: "Ob River" },
      { label: "D", body: "Yangtze River" },
    ],
    correctLabel: "D",
    explanation: "At 6,236 km, the Yangtze River is the longest listed in the table.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "easy",
    stimulus:
      "City | Number of residents\nPhoenix, Arizona | 4,709\nSeattle, Washington | 14,801\nMadison, Wisconsin | 7,186\nBoulder, Colorado | 5,314\n\nIn the table, the city with the lowest number of residents who often biked to work in 2016 is ______.",
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      { label: "A", body: "Madison, Wisconsin." },
      { label: "B", body: "Seattle, Washington." },
      { label: "C", body: "Phoenix, Arizona." },
      { label: "D", body: "Boulder, Colorado." },
    ],
    correctLabel: "C",
    explanation: "Phoenix has the lowest figure in the table, at 4,709.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "It may seem that works of art are best experienced in person. However, in an online collection from the Museo de Arte de Lima in Lima, Peru, people can zoom in on a high-quality image of the drawing Drawing B... by Gilda Mantilla. A student argues that viewers usually can't examine works of art in a museum as carefully as they can examine works in online collections.",
    stem: "Which statement, if true, would most directly support the underlined argument? (The underlined portion reads: \"viewers usually can't examine works of art in a museum as carefully as they can examine works in online collections.\")",
    choices: [
      { label: "A", body: "Most museums have signs that provide basic information about the works of art on display." },
      { label: "B", body: "Most museums don't allow visitors to get very close to the works of art on display." },
      { label: "C", body: "Many museums have started adding images of works from their collections to their websites." },
      { label: "D", body: "Museums don't always put works by different artists together in one room." },
    ],
    correctLabel: "B",
    explanation: "If visitors can't get close to museum artworks, they can't examine them as closely as a zoomable online image allows.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Common name | Average mass (kg) | Capable of flight?\nGreat bustard | 10.6 | Yes\nTrumpeter swan | 12.7 | Yes\nEmperor penguin | 31.5 | No\nCommon ostrich | 104.0 | No\n\nMost bird species that are capable of flight weigh less than a kilogram (kg), which is not surprising considering the burden that extra body weight puts on a flying animal. But not all flying birds are so light, as we can see most clearly in the example of the ______.",
    stem: "Which choice most effectively uses data from the table to complete the example?",
    choices: [
      { label: "A", body: "common ostrich, which has a higher average mass than the emperor penguin." },
      { label: "B", body: "trumpeter swan, which has an average mass of 12.7 kg." },
      { label: "C", body: "common ostrich, which has an average mass of 104.0 kg." },
      { label: "D", body: "great bustard, which has an average mass below 10 kg." },
    ],
    correctLabel: "B",
    explanation: "The example must be a bird capable of flight — the trumpeter swan (12.7 kg) is the heaviest flying bird in the table.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      'In a recent study, Antonia Olivia Dolan and colleagues investigated the relationship between people\'s music preferences and their preferred listening volume. Participants listened to recordings—Led Zeppelin\'s "Whole Lotta Love," Ludwig van Beethoven\'s Symphony no. 5 in C Minor, and others—at their preferred volume and indicated their most and least favorite among the recordings. The researchers found that participants listened to recordings they liked most at a higher volume than recordings they liked least. And given that the frequencies in all the recordings were within the audible range of these participants (all of whom had clinically typical hearing), it is therefore likely that for a given participant, the ______.',
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "relationship between the preferred volume of a recording and the participant's attitude toward that recording cannot be attributed to its genre." },
      { label: "B", body: "fact that the preferred volume differed by recording cannot be attributed to the participant wanting to hear the favorite recording at a higher volume than the least favorite recording." },
      { label: "C", body: "difference between the preferred volumes of the favorite and least favorite recordings cannot be attributed to one recording being inherently harder to hear than the other." },
      { label: "D", body: "identification of one recording as the favorite and another recording as the least favorite cannot be attributed to the participant having prior familiarity with either recording." },
    ],
    correctLabel: "C",
    explanation: "Since all frequencies were within typical audible range, the volume difference can't be explained by one recording being harder to hear.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Research such as the 2010 study of arthropods by Alvin Aaden Yim–Hol Chan and colleagues has shown that noise from human activity, like traffic on a busy highway, has various significant effects on animals, and many governments require studies of the potential noise effects on wildlife before approving highway construction projects. For one of these projects, a group of researchers suggested that, although there are both arthropods and birds in the area, taking actions to reduce the effects of noise on the arthropods will probably protect both types of animals because noise tends to affect arthropods more strongly than birds. Another group of researchers indicated that, although the effects are usually greater on arthropods, addressing ______.",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "the species of birds in the area experience different negative effects from noise than the species of arthropods in the area do." },
      { label: "B", body: "the actions to reduce effects on the arthropods are significantly more robust than is needed to lessen the effects on the birds in the area." },
      { label: "C", body: "the effects of noise on birds have been more thoroughly studied than the effects on arthropods have." },
      { label: "D", body: "the types of actions that are usually taken to lessen the effects of noise on birds can sometimes harm arthropods." },
    ],
    correctLabel: "A",
    explanation: "The second group's caveat only makes sense if bird and arthropod effects differ in kind, meaning arthropod-focused actions wouldn't automatically protect birds too.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Few stories in art history rival the gilded drama of James McNeill Whistler's Peacock Room. This sumptuous dining space became the setting of a spectacular falling–out between Whistler, who transformed the somber room into a golden aviary, and shipping magnate Frederick Leyland, who commissioned the work but refused to pay for what he ______ as a tasteless, gaudy design.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "having viewed" },
      { label: "B", body: "viewed" },
      { label: "C", body: "to view" },
      { label: "D", body: "viewing" },
    ],
    correctLabel: "B",
    explanation: "The clause needs a finite past-tense verb, \"viewed,\" to state what Leyland did.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "When searching for clues about how Neolithic peoples lived, British archaeologist Lisa–Marie Shillito starts by examining ______ trash. Buried trash deposits (known as middens) are a rich source of information for archaeologists like Shillito.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "they're" },
      { label: "B", body: "their" },
      { label: "C", body: "its" },
      { label: "D", body: "it's" },
    ],
    correctLabel: "B",
    explanation: 'The possessive "their" correctly refers back to the plural "Neolithic peoples."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "One example of public art (art that's readily accessible to the general public) ______ the work Singing Ringing Tree. This sculpture is installed on public land in Burnley, England.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "were" },
      { label: "B", body: "being" },
      { label: "C", body: "are" },
      { label: "D", body: "is" },
    ],
    correctLabel: "D",
    explanation: 'The singular subject "one example" requires the singular verb "is."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      'Many ranching terms come from Spanish. For example, the word "rodeo" (a roundup) comes from the Spanish word rodear, and "cinch" (a belt) ______ from cincho. This is because the first Anglo, African, and Native American cattle ranchers in the southwestern US learned the trade from Spanish–speaking Mexican vaqueros, or cowboys.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "will be coming" },
      { label: "B", body: "will come" },
      { label: "C", body: "had come" },
      { label: "D", body: "comes" },
    ],
    correctLabel: "D",
    explanation: 'Parallel with "comes from the Spanish word rodear," the present tense "comes" is required.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "easy",
    stimulus:
      "Many places in the United States share a name with a foreign city or country. When founding the town of Edinburgh, Indiana, residents decided to name ______ after the Scottish city of Edinburgh.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "it" },
      { label: "B", body: "that" },
      { label: "C", body: "them" },
      { label: "D", body: "us" },
    ],
    correctLabel: "A",
    explanation: 'The singular pronoun "it" correctly refers back to "the town of Edinburgh, Indiana."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      'Many folktales that originate in the Persian language start with a phrase that roughly translates to "someday, sometime." Many tales that originate in English use "once upon a time." Such phrases, known as story starters, ______ from language to language.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "varies" },
      { label: "B", body: "has varied" },
      { label: "C", body: "is varying" },
      { label: "D", body: "vary" },
    ],
    correctLabel: "D",
    explanation: 'The plural subject "phrases" requires the plural present-tense verb "vary."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "As anthropologist Cristina Grasseni explains, many artisanal cheeses in Italy, such as Castelmagno from Piedmont and Quartirolo Lombardo from Lombardy, are highly valued for their regional authenticity; ______ they are prized for being made using local ingredients and methods typical of their respective geographic regions.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "still," },
      { label: "B", body: "rather," },
      { label: "C", body: "then," },
      { label: "D", body: "that is," },
    ],
    correctLabel: "D",
    explanation: "The second clause restates the first idea in other words, matching \"that is.\"",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "Thousands of years ago, the Olmec civilization's reign over parts of eastern Mexico ended. ______ the Olmecs' massive stone statues of human heads remain. Two of these statues, known as Monument 4 and Monument 3, weigh over 5 tons!",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Still," },
      { label: "B", body: "Previously," },
      { label: "C", body: "Secondly," },
      { label: "D", body: "Therefore," },
    ],
    correctLabel: "A",
    explanation: "Despite the civilization's end, the statues remain — a contrast matching \"Still.\"",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "Unlike the sprawling, permanent mural installations of Aurora Reyes Flores and other contemporaries of the Muralismo Mexicano movement, the easily reproducible block print posters that Alberto Beltrán and Jean Charlot created as part of the printmaking collective Taller de Gráfica Popular (TGP) were highly portable. ______ the prints were a boon to the TGP's goal of spreading their artwork throughout Mexico and the world beyond.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "For instance," },
      { label: "B", body: "Despite this," },
      { label: "C", body: "To be exact," },
      { label: "D", body: "As such," },
    ],
    correctLabel: "D",
    explanation: "Being portable directly leads to being a boon for spreading the artwork, matching the consequential \"As such.\"",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The Vistula River is in Europe.\n• It is the eighth longest river in Europe.\n• It crosses the countries Belarus and Poland.\n• It ranks No. 133 among the longest rivers in the world.\n• It is 1,213 kilometers long.\n\nThe student wants to specify how many kilometers long the Vistula River is.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "The Vistula River crosses both Belarus and Poland in Europe." },
      { label: "B", body: "The Vistula River in Europe is 1,213 kilometers long." },
      { label: "C", body: "Among the longest rivers in the world, the Vistula River ranks No. 133." },
      { label: "D", body: "The eighth longest river in Europe, the Vistula River crosses both Belarus and Poland." },
    ],
    correctLabel: "B",
    explanation: "Only this choice states the river's length in kilometers, which is exactly the student's goal.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Chapantongo is a municipality in the state of Hidalgo, Mexico. It had a population of 12,967 in 2020.\n• Chapulhuacán is a municipality in Hidalgo.\n• It had a population of 22,903 in 2020.\n• Municipalities are governmental regions responsible for providing many public services to their residents.\n• Hidalgo is divided into 84 municipalities.\n\nThe student wants to emphasize a similarity between Chapantongo and Chapulhuacán.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Chapantongo is one of 84 governmental regions, known as municipalities, in Hidalgo, Mexico." },
      { label: "B", body: "As of 2020, Chapantongo was not as populous as Chapulhuacán." },
      { label: "C", body: "As a municipality of Hidalgo, Chapulhuacán is responsible for providing many public services." },
      { label: "D", body: "Both Chapantongo and Chapulhuacán are municipalities in Hidalgo, Mexico." },
    ],
    correctLabel: "D",
    explanation: "Only this choice names both towns and states their shared trait — being municipalities of Hidalgo.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Sodium is a chemical element.\n• When the electrons of a chemical element change energy states, certain wavelengths of light are released.\n• This unique collection of wavelengths is known as the emission spectrum of the element.\n• Sodium's emission spectrum includes the 589.5 nanometer (nm) wavelength of light.\n• Wavelengths of 570–590 nm make up the yellow portion of the visible spectrum.\n\nThe student wants to indicate one of the wavelengths of light in sodium's emission spectrum.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Sodium's emission spectrum consists of a unique collection of wavelengths." },
      { label: "B", body: "When sodium's electrons change energy states, certain wavelengths of light are released." },
      { label: "C", body: "One of the wavelengths in sodium's emission spectrum is the 589.5 nm wavelength." },
      { label: "D", body: "If a chemical element releases a wavelength of light between 570–590 nm, that wavelength would be part of the yellow portion of the visible spectrum." },
    ],
    correctLabel: "C",
    explanation: "Only this choice states an actual wavelength from sodium's emission spectrum, which is exactly the student's goal.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Ukiyo-e woodblock prints were a popular artistic form in Japan from the 1600s through the 1800s.\n• Ukiyo-e prints were produced by teams of artisans that included artists, wood-carvers, printers, and publishers.\n• Sōsaku-hanga was a popular Japanese printmaking movement that emerged in the early 1900s.\n• Sōsaku-hanga prioritized individual artistic expression.\n• An artist working in this style typically handled all aspects of print creation, from drawing to wood carving to printing.\n\nThe student wants to contrast ukiyo-e and sōsaku-hanga production methods.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "In contrast to ukiyo-e prints, sōsaku-hanga prints were produced using methods such as drawing and wood carving." },
      { label: "B", body: "Ukiyo-e prints were popular in Japan from the 1600s through the 1800s, while sōsaku-hanga prints emerged later, in the early 1900s." },
      { label: "C", body: "One notable distinction between ukiyo-e and sōsaku-hanga prints is sōsaku-hanga's emphasis on individual artistic expression." },
      { label: "D", body: "Teams of artisans produced ukiyo-e prints, whereas individual artists typically handled all aspects of sōsaku-hanga printmaking themselves." },
    ],
    correctLabel: "D",
    explanation: "Only this choice directly contrasts the two production methods — team-produced versus handled entirely by one artist.",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 1 (22 questions)
// ---------------------------------------------------------------------------

const MATH_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Functions",
    difficulty: "easy",
    stem: "The function h is defined by h(x) = 100x − 40. What is the value of h(x) when x = 5?",
    choices: [
      { label: "A", body: "540" },
      { label: "B", body: "460" },
      { label: "C", body: "145" },
      { label: "D", body: "65" },
    ],
    correctLabel: "B",
    explanation: "h(5) = 100(5) − 40 = 460.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "easy",
    stem: "A teacher is creating an assignment worth 42 points. The assignment will consist of questions worth 1 point and questions worth 2 points. Which equation represents this situation, where x represents the number of 1-point questions and y represents the number of 2-point questions?",
    choices: [
      { label: "A", body: "3xy = 42" },
      { label: "B", body: "3(x + y) = 42" },
      { label: "C", body: "2x + y = 42" },
      { label: "D", body: "x + 2y = 42" },
    ],
    correctLabel: "D",
    explanation: "Each 1-point question contributes x points and each 2-point question contributes 2y points, totaling x + 2y = 42.",
  },
  {
    type: "student_response",
    topic: "Right triangles",
    difficulty: "easy",
    stem: "A triangle has a base length of 60 centimeters and a height of 40 centimeters. What is the area, in square centimeters, of the triangle?",
    correctResponse: "1200",
    explanation: "Area = (1/2)(60)(40) = 1,200.",
  },
  {
    type: "multiple_choice",
    topic: "Factoring",
    difficulty: "medium",
    stem: "Which expression is equivalent to x³ + 2x² + 9x + 18?",
    choices: [
      { label: "A", body: "(x + 9)(x² + 2)" },
      { label: "B", body: "(x + 2)(x² + 9)" },
      { label: "C", body: "(x + 1)(x² + 18)" },
      { label: "D", body: "(x + 18)(x² + 1)" },
    ],
    correctLabel: "B",
    explanation: "Grouping x²(x + 2) + 9(x + 2) gives (x + 2)(x² + 9).",
  },
  {
    type: "student_response",
    topic: "Lines & slope",
    difficulty: "medium",
    stem: "Line j is shown in the xy-plane, passing through the points (0, 3) and (1, 5). Line k (not shown) is parallel to line j. What is the slope of line k?",
    correctResponse: "2",
    explanation: "Line j has slope (5 − 3)/(1 − 0) = 2; a parallel line shares the same slope.",
  },
  {
    type: "multiple_choice",
    topic: "Radicals",
    difficulty: "easy",
    stem: "If √(x − 3) = 5, what is the value of (x − 3)?",
    choices: [
      { label: "A", body: "5" },
      { label: "B", body: "22" },
      { label: "C", body: "25" },
      { label: "D", body: "50" },
    ],
    correctLabel: "C",
    explanation: "Squaring both sides gives x − 3 = 25.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "The graph of a system of an absolute value function and a linear function is shown, intersecting at one point in the xy-plane. What is the solution (x, y) to this system of two equations?",
    choices: [
      { label: "A", body: "(0, 7)" },
      { label: "B", body: "(3/2, 11/2)" },
      { label: "C", body: "(−3/2, 11/2)" },
      { label: "D", body: "(−1, 5)" },
    ],
    correctLabel: "C",
    explanation: "The graphed intersection point of the two functions is (−3/2, 11/2).",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / graphs",
    difficulty: "easy",
    stem: "Week | Number of dogs walked\n1 | 6\n2 | 18\n3 | 30\n\nThe table shows the number of dogs walked by a dog walker each week for 3 weeks. What is the mean number of dogs walked per week for these 3 weeks?",
    choices: [
      { label: "A", body: "6" },
      { label: "B", body: "18" },
      { label: "C", body: "30" },
      { label: "D", body: "64" },
    ],
    correctLabel: "B",
    explanation: "Mean = (6 + 18 + 30)/3 = 18.",
  },
  {
    type: "multiple_choice",
    topic: "Ratios and proportions",
    difficulty: "easy",
    stem: "The ratio 54 to m is equivalent to the ratio 2 to 18. What is the value of m?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "18" },
      { label: "C", body: "162" },
      { label: "D", body: "486" },
    ],
    correctLabel: "D",
    explanation: "54/m = 2/18, so m = 54(18)/2 = 486.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "easy",
    stem: "As part of a science experiment on evaporation, Ella measured the height of water in a glass over a period of time. The function f(x) = 32 − 0.21x gives the estimated height, in centimeters (cm), of the water in the glass x days after the start of the experiment. Which of the following is the best interpretation of 32 in this context?",
    choices: [
      { label: "A", body: "The estimated height, in cm, of the water at the start of the experiment." },
      { label: "B", body: "The estimated height, in cm, of the water at the end of the experiment." },
      { label: "C", body: "The estimated change in the height, in cm, of the water each day." },
      { label: "D", body: "The estimated number of days for all the water to evaporate." },
    ],
    correctLabel: "A",
    explanation: "At x = 0 (the start), f(0) = 32, so 32 is the estimated starting height.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential functions",
    difficulty: "medium",
    stem: "x | y\n1 | 10\n2 | 16\n3 | a\n\nThe table shows three values of x and their corresponding values of y for the equation y = 3(2)^x + 4. In the table, a is a constant. What is the value of a?",
    choices: [
      { label: "A", body: "22" },
      { label: "B", body: "24" },
      { label: "C", body: "28" },
      { label: "D", body: "52" },
    ],
    correctLabel: "C",
    explanation: "At x = 3: y = 3(2³) + 4 = 24 + 4 = 28.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "medium",
    stem: "The figure shows the xy-plane with the quadrants labeled I, II, III, and IV. The graph of a linear function h (not shown), where y = h(x), is a line completely contained in only quadrants I and II of the xy-plane. Which of the following could define the function h?",
    choices: [
      { label: "A", body: "h(x) = 16x + 16" },
      { label: "B", body: "h(x) = 16x" },
      { label: "C", body: "h(x) = 16" },
      { label: "D", body: "x = 16" },
    ],
    correctLabel: "C",
    explanation: "A horizontal line at a positive constant y-value (h(x) = 16) stays in the upper half-plane — quadrants I and II — for all x.",
  },
  {
    type: "student_response",
    topic: "Percentages",
    difficulty: "medium",
    stem: "A real estate company offers a series of three webinars. 3,125 people attended the first webinar. 48% of the people who attended the first webinar attended the second webinar, and 37% of the people who attended the first and second webinars attended the third webinar. How many people attended all three webinars?",
    correctResponse: "555",
    explanation: "3,125 × 0.48 = 1,500 attended the second; 1,500 × 0.37 = 555 attended all three.",
  },
  {
    type: "multiple_choice",
    topic: "Trigonometry",
    difficulty: "medium",
    stem: "Right triangle YZX has a right angle at Z, with YZ = 126, ZX = 168, and hypotenuse YX = 210. What is the value of tan X in the triangle shown?",
    choices: [
      { label: "A", body: "4/5" },
      { label: "B", body: "3/4" },
      { label: "C", body: "3/5" },
      { label: "D", body: "4/3" },
    ],
    correctLabel: "B",
    explanation: "tan X = opposite/adjacent = YZ/ZX = 126/168 = 3/4.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "medium",
    stem: "−3(4v − 1)(v + 6)² − (v + 6)² = 0\n\nWhat is the positive solution to the given equation?",
    choices: [
      { label: "A", body: "6" },
      { label: "B", body: "4" },
      { label: "C", body: "1/4" },
      { label: "D", body: "1/6" },
    ],
    correctLabel: "D",
    explanation: "Factoring (v + 6)²[−3(4v − 1) − 1] = 0 gives v = −6 or −12v + 2 = 0, so v = 1/6.",
  },
  {
    type: "multiple_choice",
    topic: "Percentages",
    difficulty: "medium",
    stem: "The number f is 130% greater than a positive number g. A number h is 20% less than the number f. The number h is how many times the number g?",
    choices: [
      { label: "A", body: "0.26" },
      { label: "B", body: "0.46" },
      { label: "C", body: "1.04" },
      { label: "D", body: "1.84" },
    ],
    correctLabel: "D",
    explanation: "f = 2.3g, and h = 0.8f = 0.8(2.3g) = 1.84g.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "medium",
    stem: "4x² − 12x + 4 = 0\n\nWhat is a solution to the given equation?",
    choices: [
      { label: "A", body: "(3 − √5) / 2" },
      { label: "B", body: "(3 − √10) / 2" },
      { label: "C", body: "(12 − √80) / 2" },
      { label: "D", body: "(12 − √208) / 2" },
    ],
    correctLabel: "A",
    explanation: "Dividing by 4 gives x² − 3x + 1 = 0, so x = (3 ± √5)/2.",
  },
  {
    type: "student_response",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "If 12 + (1/4)(7x − 5) = (3/4)(7x − 5), what is the value of 7x − 5?",
    correctResponse: "24",
    explanation: "Letting u = 7x − 5: 12 + u/4 = 3u/4, so 12 = u/2 and u = 24.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — similarity",
    difficulty: "medium",
    stem: "Triangle ABC is similar to triangle XYZ, where A and B correspond to X and Y, respectively. The length of each side of triangle XYZ is k times the length of its corresponding side in triangle ABC, where k is an integer greater than 1. The measure, in degrees, of angle Z can be represented by the expression 9x + 29, where x is an integer. Which of the following expressions represents the measure, in degrees, of angle C for all possible values of x?",
    choices: [
      { label: "A", body: "9x + 29" },
      { label: "B", body: "k(9x + 29)" },
      { label: "C", body: "90 − (9x + 29)" },
      { label: "D", body: "180 − k(9x + 29)" },
    ],
    correctLabel: "A",
    explanation: "Similar triangles have equal corresponding angles regardless of the scale factor k, so angle C equals angle Z.",
  },
  {
    type: "student_response",
    topic: "Polynomial expressions",
    difficulty: "hard",
    stem: "f(x) = x + 3\ng(x) = 7x² − rx + 63\n\nThe functions f and g are given. In function g, r is a constant. If f(x)·g(x) = 7x³ + 189, what is the value of r?",
    correctResponse: "21",
    explanation: "Expanding (x+3)(7x²−rx+63) = 7x³ + (21−r)x² + (63−3r)x + 189; the x² and x coefficients must vanish, giving r = 21.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — volume",
    difficulty: "medium",
    stem: "A conservation specialist hung artificial nesting structures, each in the shape of a right rectangular prism, for a species of native duck. Each structure has a height of 18 inches. The length of each structure's base is x inches, which is 1 inch more than the width of the structure's base. Which function V gives the volume of each structure, in cubic inches, in terms of the length of the structure's base?",
    choices: [
      { label: "A", body: "V(x) = x(x + 18)(x + 1)" },
      { label: "B", body: "V(x) = x(x + 18)(x − 1)" },
      { label: "C", body: "V(x) = 18x(x + 1)" },
      { label: "D", body: "V(x) = 18x(x − 1)" },
    ],
    correctLabel: "D",
    explanation: "Width = x − 1 (since length x is 1 inch more than width), so volume = 18 · x · (x − 1).",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "Which system of equations has no solution?",
    choices: [
      { label: "A", body: "−4x + 2y = −7\n4x − 2y = 7" },
      { label: "B", body: "4x − 2y = 7\n5x + 3y = 8" },
      { label: "C", body: "4x − 2y = 7\n−12x + 6y = −21" },
      { label: "D", body: "−4x + 2y = 7\n8x − 4y = 14" },
    ],
    correctLabel: "D",
    explanation: "Doubling the first equation gives 8x − 4y = −14, which contradicts the second equation's 8x − 4y = 14 — the same slope with different intercepts, so no solution.",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 2 (22 questions). Question 17's text was missing from the
// source PDF (a page-break gap between Q16 and Q18); question 17 below is
// reused from the March 2026 test's bank rather than left out, matching how
// real question banks recycle items across administrations.
// ---------------------------------------------------------------------------

const MATH_MODULE_2: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "medium",
    stem: "A total of 215 toothpicks of equal length were used to construct two types of figures: triangles and squares. The triangles and squares were constructed so that no two figures had a common side. The equation 3x + 4y = 215 represents this situation, where x is the number of triangles constructed and y is the number of squares constructed. What is the best interpretation of (x, y) = (25, 35) in this context?",
    choices: [
      { label: "A", body: "If 25 triangles were constructed, then 35 squares were constructed." },
      { label: "B", body: "If 25 triangles were constructed, then 35 toothpicks were used." },
      { label: "C", body: "If 35 triangles were constructed, then 25 squares were constructed." },
      { label: "D", body: "If 35 triangles were constructed, then 25 toothpicks were used." },
    ],
    correctLabel: "A",
    explanation: "x represents triangles and y represents squares, so (25, 35) means 25 triangles and 35 squares.",
  },
  {
    type: "student_response",
    topic: "Functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = 2x + b, where b is a constant and f(4) = 1. What is the value of b?",
    correctResponse: "-7",
    explanation: "2(4) + b = 1, so b = 1 − 8 = −7.",
  },
  {
    type: "multiple_choice",
    topic: "Polynomial expressions",
    difficulty: "medium",
    stem: "The graph of y = f(x) is shown, where the function f is defined by f(x) = ax³ + bx² + cx + d and a, b, c, and d are constants. For how many values of x does f(x) = 0?",
    choices: [
      { label: "A", body: "One" },
      { label: "B", body: "Two" },
      { label: "C", body: "Three" },
      { label: "D", body: "Four" },
    ],
    correctLabel: "C",
    explanation: "The graph crosses the x-axis at three distinct points.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "medium",
    stem: "If 3(x − 4)² = 243, what is the value of x² − 8x?",
    choices: [
      { label: "A", body: "49" },
      { label: "B", body: "65" },
      { label: "C", body: "81" },
      { label: "D", body: "97" },
    ],
    correctLabel: "B",
    explanation: "x² − 8x = (x − 4)² − 16 = 81 − 16 = 65.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / scatterplots",
    difficulty: "medium",
    stem: "The scatterplot shows the relationship between two variables x and y, forming a downward-opening curve peaking around x = 50. Which of the following equations is the most appropriate quadratic model for the data shown?",
    choices: [
      { label: "A", body: "y = −0.005(x − 50)² + 34" },
      { label: "B", body: "y = −0.005(x − 34)² + 50" },
      { label: "C", body: "y = 0.005(x − 50)² + 34" },
      { label: "D", body: "y = 0.005(x − 34)² + 50" },
    ],
    correctLabel: "A",
    explanation: "The data peaks (rather than dips) around x = 50 at y ≈ 34, matching a negative leading coefficient with vertex (50, 34).",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — volume",
    difficulty: "medium",
    stem: "A right circular cylinder has a volume of 36,501π cubic inches. The height of the cylinder is 3 times its radius. What is the radius, in inches, of the cylinder?",
    choices: [
      { label: "A", body: "23" },
      { label: "B", body: "69" },
      { label: "C", body: "529" },
      { label: "D", body: "1,587" },
    ],
    correctLabel: "A",
    explanation: "Volume = πr²(3r) = 3πr³ = 36,501π, so r³ = 12,167 and r = 23.",
  },
  {
    type: "student_response",
    topic: "Linear equations",
    difficulty: "easy",
    stem: "The function g is defined by g(x) = 16x + 39. For what value of x does g(x) = 43?",
    correctResponse: "1/4",
    explanation: "16x + 39 = 43 gives 16x = 4, so x = 1/4.",
  },
  {
    type: "student_response",
    topic: "Geometry — circles",
    difficulty: "medium",
    stem: "In the xy-plane, an equation of circle R is (x + 7)² + (y + 19)² = 100. Circle S is obtained by shifting circle R to the right 2 units. An equation defining circle S is (x + h)² + (y + k)² = 100, where h and k are constants. What is the value of h?",
    correctResponse: "5",
    explanation: "Circle R's center is (−7, −19); shifting right 2 gives center (−5, −19), so h = 5 (since center = (−h, −k)).",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "x | y\n−26 | t\n−13 | t + 29\n0 | t + 58\n\nFor a linear function between x and y, the table gives three values of x and their corresponding values of y, where t is a constant. Which equation represents this relationship?",
    choices: [
      { label: "A", body: "y = −2x + t + 29" },
      { label: "B", body: "y = 2x + t + 29" },
      { label: "C", body: "y = −(29/13)x + t + 58" },
      { label: "D", body: "y = (29/13)x + t + 58" },
    ],
    correctLabel: "D",
    explanation: "The slope is 29/13 (rise of 29 over run of 13), and at x = 0, y = t + 58.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "5(7x) + 8(6y) = 266\n5(7x) − 8(6y) = −406\n\nThe solution to the given system of equations is (x, y). What is the value of (7x + 6y)?",
    choices: [
      { label: "A", body: "−56" },
      { label: "B", body: "−14" },
      { label: "C", body: "28" },
      { label: "D", body: "42" },
    ],
    correctLabel: "C",
    explanation: "Adding the equations: 70x = −140, so x = −2; subtracting: 96y = 672, so y = 7; 7x + 6y = −14 + 42 = 28.",
  },
  {
    type: "multiple_choice",
    topic: "Inequalities",
    difficulty: "medium",
    stem: "y < 13x + 12\n\nFor which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality?\n\nA) (2,21) (4,81) (6,73)\nB) (2,21) (4,47) (6,73)\nC) (2,38) (4,64) (6,90)\nD) (2,38) (4,73) (6,90)",
    choices: [
      { label: "A", body: "x=2,y=21; x=4,y=81; x=6,y=73" },
      { label: "B", body: "x=2,y=21; x=4,y=47; x=6,y=73" },
      { label: "C", body: "x=2,y=38; x=4,y=64; x=6,y=90" },
      { label: "D", body: "x=2,y=38; x=4,y=73; x=6,y=90" },
    ],
    correctLabel: "B",
    explanation: "13x+12 at x=2,4,6 is 38,64,90; only table B has every y strictly less than these bounds (21<38, 47<64, 73<90).",
  },
  {
    type: "student_response",
    topic: "Exponential functions",
    difficulty: "medium",
    stem: "The function f is defined by the equation f(x) = 9^x + b, where b is a constant. In the xy-plane, the graph of y = f(x) contains the points (0, 27) and (3, p + 16), where p is a constant. What is the value of p?",
    correctResponse: "739",
    explanation: "f(0) = 1 + b = 27 gives b = 26; f(3) = 9³ + 26 = 755 = p + 16, so p = 739.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations",
    difficulty: "hard",
    stem: "(−20x − 37 + m) / 2 = k(x + 6)\n\nIn the given equation, k and m are constants. The equation has infinitely many solutions. What is the value of m?",
    choices: [
      { label: "A", body: "49" },
      { label: "B", body: "-10" },
      { label: "C", body: "-23" },
      { label: "D", body: "-83" },
    ],
    correctLabel: "D",
    explanation: "The left side simplifies to −10x + (m/2 − 18.5); matching k = −10 and constants gives m/2 − 18.5 = −60, so m = −83.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential models",
    difficulty: "medium",
    stem: "f(x) = 5,000(1.003)^(2x)\n\nThe given function f models the balance of a bank account, in dollars, x years after it is opened. Which statement is the best interpretation of (1.003)^(2x)?",
    choices: [
      { label: "A", body: "Every 6 months, the balance increases by about $3." },
      { label: "B", body: "Every 2 years, the balance increases by about $3." },
      { label: "C", body: "At the end of every 6-month interval, the balance increases by about 0.3% of the balance at the beginning of the 6-month interval." },
      { label: "D", body: "At the end of every 2-year interval, the balance increases by about 0.3% of the balance at the beginning of the 2-year interval." },
    ],
    correctLabel: "C",
    explanation: "Since the exponent 2x increases by 2 for every year (two applications of the 0.3% growth factor per year), each factor of 1.003 corresponds to a 6-month, 0.3% increase.",
  },
  {
    type: "multiple_choice",
    topic: "Percentages",
    difficulty: "medium",
    stem: "At a hotel, guests used the pool for a total of t hours in March. At the same hotel, guests used the pool for 3.78t hours in April. What is the percent increase in the number of hours guests used the pool from March to April?",
    choices: [
      { label: "A", body: "2.78%" },
      { label: "B", body: "3.78%" },
      { label: "C", body: "278%" },
      { label: "D", body: "378%" },
    ],
    correctLabel: "C",
    explanation: "Percent increase = (3.78t − t)/t × 100 = 278%.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / graphs",
    difficulty: "hard",
    stem: "A researcher selected 23 guinea pigs from one habitat and 19 wild cavies from another habitat at random in Venezuela. A field within each habitat was divided into equally sized virtual squares, and the animals were allowed to wander in the field for a fixed amount of time. The researcher counted the number of times the guinea pigs and wild cavies crossed the virtual squares during early adolescence and again during late adolescence. In early adolescence, the wild cavies crossed significantly more squares than the guinea pigs did, and the number of squares crossed by both groups decreased from early to late adolescence. Based on the researcher's findings, which of the following statements is an appropriate conclusion that can be drawn from this study?",
    choices: [
      { label: "A", body: "The statistically significant difference in behavior between the two age groups was caused by the differences in habitat." },
      { label: "B", body: "The statistically significant difference in behavior between the two age groups was caused by aging." },
      { label: "C", body: "The statistically significant difference in behavior during early adolescence between the two groups of animals can be generalized to all guinea pigs and wild cavies." },
      { label: "D", body: "The statistically significant difference in behavior during early adolescence between the two groups of animals can only be generalized to the habitats in the study." },
    ],
    correctLabel: "B",
    explanation: "The decrease from early to late adolescence, observed in both groups, is best attributed to aging rather than to habitat or an unwarranted broader generalization.",
  },
  {
    type: "multiple_choice",
    topic: "Circles — tangent lines",
    difficulty: "hard",
    stem: "A circle in the xy-plane has its center at (−5, 5). Line t is tangent to this circle at the point (6, −1). Which of the following points also lies on line t?",
    choices: [
      { label: "A", body: "(0, 11/6)" },
      { label: "B", body: "(1, 16)" },
      { label: "C", body: "(12, 10)" },
      { label: "D", body: "(17, 5)" },
    ],
    correctLabel: "C",
    explanation: "The radius to (6, −1) has slope −6/11, so the tangent line's slope is 11/6; only (12, 10) lies on the line through (6, −1) with that slope.",
  },
  {
    type: "student_response",
    topic: "Quadratic graphs",
    difficulty: "hard",
    stem: "The quadratic function g models the depth, in meters, below the surface of the water of a Weddell seal t minutes after the seal entered the water during a dive. The function estimated that the seal reached its maximum depth of 409.6 meters 8 minutes after it entered the water and then reached the surface of the water 16 minutes after it entered the water. Based on the function, what was the estimated depth, to the nearest meter, of the seal 11 minutes after it entered the water?",
    correctResponse: "352",
    explanation: "With g(t) = a(t−8)² + 409.6 and g(16) = 0, a = −6.4; g(11) = −6.4(9) + 409.6 = 352.",
  },
  {
    type: "multiple_choice",
    topic: "Angles — radians and degrees",
    difficulty: "easy",
    stem: "The measure of angle G is π/10 radians. If the measure of angle G is 9n degrees, where n is a constant, what is the value of n?",
    choices: [
      { label: "A", body: "2" },
      { label: "B", body: "9" },
      { label: "C", body: "10" },
      { label: "D", body: "18" },
    ],
    correctLabel: "A",
    explanation: "π/10 radians = 18°; setting 9n = 18 gives n = 2.",
  },
  {
    type: "multiple_choice",
    topic: "Trigonometry",
    difficulty: "hard",
    stem: "In triangle XYZ, the measure of angle X is 90°. Point W lies on segment YZ, and segment WX is perpendicular to segment YZ. The length of segment WY is 684, and the length of segment WX is 513. What is the value of tan Z?",
    choices: [
      { label: "A", body: "4/3" },
      { label: "B", body: "4/5" },
      { label: "C", body: "3/4" },
      { label: "D", body: "3/5" },
    ],
    correctLabel: "A",
    explanation: "Using the altitude-on-hypotenuse relation WX² = WY·WZ, WZ = 513²/684 = 384.75; tan Z = WX/WZ = 513/384.75 = 4/3.",
  },
  {
    type: "student_response",
    topic: "Quadratic equations",
    difficulty: "hard",
    stem: "r² + qr = 4r − 55\n\nIn the given equation, q is an integer constant. The given equation has no real solutions. What is the largest possible value of q?",
    correctResponse: "18",
    explanation: "Rewriting as r² + (q−4)r + 55 = 0, no real solutions requires (q−4)² < 220, so q < 4 + √220 ≈ 18.83; the largest integer is 18.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — similarity",
    difficulty: "hard",
    stem: "In triangle ABC, the measure of angle B is 90° and BD is an altitude of the triangle. The length of AB is 15 and the length of AC is 17 greater than the length of AB. What is the value of BC/BD?",
    choices: [
      { label: "A", body: "15/32" },
      { label: "B", body: "15/17" },
      { label: "C", body: "17/15" },
      { label: "D", body: "32/15" },
    ],
    correctLabel: "D",
    explanation: "Since area = (1/2)(AB)(BC) = (1/2)(AC)(BD), BC/BD = AC/AB = 32/15.",
  },
];

// ---------------------------------------------------------------------------

const MODULES: {
  section: "reading_writing" | "math";
  moduleNumber: 1 | 2;
  timeLimitSeconds: number;
  questions: QuestionInput[];
}[] = [
  { section: "reading_writing", moduleNumber: 1, timeLimitSeconds: 32 * 60, questions: RW_MODULE_1 },
  { section: "reading_writing", moduleNumber: 2, timeLimitSeconds: 32 * 60, questions: RW_MODULE_2 },
  { section: "math", moduleNumber: 1, timeLimitSeconds: 35 * 60, questions: MATH_MODULE_1 },
  { section: "math", moduleNumber: 2, timeLimitSeconds: 35 * 60, questions: MATH_MODULE_2 },
];

async function main() {
  const [existing] = await db
    .select({ id: practiceTests.id })
    .from(practiceTests)
    .where(eq(practiceTests.slug, TEST_SLUG))
    .limit(1);

  if (existing) {
    console.log(`Removing existing "${TEST_SLUG}" test before reseeding...`);
    await db.delete(practiceTests).where(eq(practiceTests.id, existing.id));
  }

  const [test] = await db
    .insert(practiceTests)
    .values({
      title: "2025 December Practice Test",
      slug: TEST_SLUG,
      description:
        "A full-length, four-module Bluebook-style practice test (54 Reading & Writing questions, 44 Math questions) matching the real digital SAT's timing and structure.",
      isPublished: true,
    })
    .returning();

  for (let i = 0; i < MODULES.length; i++) {
    const mod = MODULES[i];
    const [module] = await db
      .insert(testModules)
      .values({
        testId: test.id,
        section: mod.section,
        moduleNumber: mod.moduleNumber,
        orderIndex: i,
        timeLimitSeconds: mod.timeLimitSeconds,
      })
      .returning();

    for (let qIndex = 0; qIndex < mod.questions.length; qIndex++) {
      const q = mod.questions[qIndex];
      const [question] = await db
        .insert(questions)
        .values({
          section: mod.section,
          type: q.type,
          topic: q.topic,
          difficulty: q.difficulty,
          stimulus: q.stimulus ?? null,
          stem: q.stem,
          correctResponse: q.correctResponse ?? null,
          explanation: q.explanation,
        })
        .returning();

      if (q.type === "multiple_choice" && q.choices) {
        await db.insert(choices).values(
          q.choices.map((c) => ({
            questionId: question.id,
            label: c.label,
            body: c.body,
            isCorrect: c.label === q.correctLabel,
          })),
        );
      }

      await db.insert(moduleQuestions).values({
        moduleId: module.id,
        questionId: question.id,
        orderIndex: qIndex,
      });
    }

    console.log(
      `Seeded ${mod.section} module ${mod.moduleNumber}: ${mod.questions.length} questions`,
    );
  }

  console.log(`Done. Test slug: ${TEST_SLUG}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
