import { db } from "@/db";
import {
  practiceTests,
  testModules,
  questions,
  choices,
  moduleQuestions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const TEST_SLUG = "2026-march-practice-test-ii";

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
      'The following text is from Lilliam Rivera\'s 2020 novel Never Look Back. The text describes the narrator arriving at his father\'s apartment.\n\n"Pops, I\'m here!" I drop my bag and set my guitar case against a wall. I place my keys on the bowl right next to the ceramic elephant Pops got me on one of his trips to Santo Domingo when I was a little kid.\n\n©2020 by Lilliam Rivera',
    stem: 'As used in the text, what does the word "drop" most nearly mean?',
    choices: [
      { label: "A", body: "Unbolt" },
      { label: "B", body: "Put down" },
      { label: "C", body: "Forget about" },
      { label: "D", body: "Erase" },
    ],
    correctLabel: "B",
    explanation: 'In context the narrator sets his bag down upon arriving, so "drop" means put down.',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "easy",
    stimulus:
      "The following text is from Rudolfo Anaya's 1972 novel Bless Me, Ultima. The young narrator and his friend Cico are staring into the water of a stream in rural New Mexico.\n\nThe golden fish swam by gracefully, cautiously, as if testing the water after a long sleep in his subterranean waters. His powerful tail moved in slow strokes as he slid through the water towards us.\n\n©1972 by Rudolfo Anaya",
    stem: 'As used in the text, what does the word "testing" most nearly mean?',
    choices: [
      { label: "A", body: "Harming" },
      { label: "B", body: "Congratulating" },
      { label: "C", body: "Trying out" },
      { label: "D", body: "Wearing out" },
    ],
    correctLabel: "C",
    explanation: 'The fish moves cautiously as if sampling the water, matching "trying out."',
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Life Among the Paiutes is an 1882 autobiographical narrative by Sarah Winnemucca Hopkins, a Northern Paiute author, educator, and activist. In the work, Winnemucca directly addresses the reader to explain certain customs, writing ______.",
    stem: "Which quotation from Life Among the Paiutes most effectively illustrates the claim?",
    choices: [
      { label: "A", body: 'But how can I describe the scene that followed? Some of you, dear readers, can imagine.' },
      { label: "B", body: 'Now, my dear reader, there is no word so endearing as the word father, and that is why [my people] call all good people father or mother.' },
      { label: "C", body: 'During the time my grandfather was away in California, where he [stayed] till after the Mexican war, there was a girl-baby born in our family.' },
      { label: "D", body: 'We would all go in company to see if the flowers we were looking for had bloomed.' },
    ],
    correctLabel: "B",
    explanation: "Only this quotation directly addresses the reader while explaining a Paiute custom (the use of 'father' and 'mother').",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "In her book Limitarianism, researcher Ingrid Robeyns criticizes economic policies that allow businesses to profit from their successes while displacing the burden of failure onto taxpayers. As an example she cites the US financial crisis of 2008 in which dozens of institutions including JPMorgan Chase and SunTrust received a collective $700 billion of government support. Had the US government previously exercised stricter regulation of risky financial instruments, Robeyns argues, this enormous expenditure of taxpayer dollars would not have been necessary.",
    stem: "Which choice best states the main topic of the text?",
    choices: [
      { label: "A", body: "Consequences of the 2008 financial crisis for JPMorgan Chase and SunTrust" },
      { label: "B", body: "How the US government used money received from taxation to help institutions recover from a period of financial instability" },
      { label: "C", body: "Techniques of assessing the risks of particular methods of financial investment" },
      { label: "D", body: "Why a scholar believes it would be beneficial for certain governmental economic practices to be reconsidered" },
    ],
    correctLabel: "D",
    explanation: "The text centers on Robeyns's argument that stricter regulation would have been beneficial, i.e., a scholar's case for reconsidering government economic practice.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      'The 1978 recording "Two Doors Down" established Dolly Parton as a key figure in pop music. But before she dabbled in pop, her singing and songwriting had been ______ the traditional folk music of the Appalachian Mountains. For example, "Little Bird," one of her best early songs, is clearly influenced by the phrasing and subject matter of Appalachian ballads.',
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "hostile to" },
      { label: "B", body: "rooted in" },
      { label: "C", body: "unaware of" },
      { label: "D", body: "helpful to" },
    ],
    correctLabel: "B",
    explanation: 'Her early work is described as clearly influenced by Appalachian ballads, so it was "rooted in" that tradition.',
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "While no one doubts that politicians are influenced by a variety of incentives, it is generally agreed that they seek to support policies their constituents favor—after all, they risk losing office if they do not. Direct contact with constituents via such means as public events and emails from voters is a major source of politicians' beliefs about their constituents' views, but it is susceptible to a selection effect. There is little reason to presume that individuals with the time, resources, and strength of feeling to directly engage with their representatives are themselves broadly representative.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      { label: "A", body: "People who are likely to contact their elected representatives do not tend to be representative of politicians' constituents generally." },
      { label: "B", body: "Direct contact with constituents shapes politicians' beliefs about policies their constituents favor, and they try to act in accordance with those beliefs." },
      { label: "C", body: "Politicians aim to advocate for their constituents' policy preferences, but politicians' understanding of those preferences may be skewed." },
      { label: "D", body: "Although politicians have an incentive to act in accordance with their constituents' views, that is not the only incentive that influences their policy decisions." },
    ],
    correctLabel: "C",
    explanation: "The text's main point is that politicians try to serve constituent preferences, but the selection effect in direct contact skews their understanding of those preferences.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "In the seventeenth century, market-savvy British greenhouses scrambled to cultivate ______ the small group of wealthy consumers who could afford to import them from the Caribbean, the fruits had become a status symbol.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "pineapples. For" },
      { label: "B", body: "pineapples, for" },
      { label: "C", body: "pineapples for" },
      { label: "D", body: "pineapples, which for" },
    ],
    correctLabel: "A",
    explanation: "Two independent clauses need to be separated with end punctuation (a period), followed by a capitalized transition word.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "easy",
    stimulus:
      'Many ranching terms come from Spanish. For example, the word "rodeo" (a roundup) ______ from the Spanish word rodear, and "cinch" (a belt) derives from cincho. This is because the first Anglo, African, and Native American cattle ranchers in the southwestern US learned the trade from Spanish-speaking Mexican vaqueros, or cowboys.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "derives" },
      { label: "B", body: "have derived" },
      { label: "C", body: "were deriving" },
      { label: "D", body: "derive" },
    ],
    correctLabel: "A",
    explanation: 'The singular subject "the word \'rodeo\'" requires the singular present-tense verb "derives," matching "derives" later in the sentence.',
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Average Paperback Prices, 2016–19\nGenre | 2016 | 2017 | 2018 | 2019\nForeign language study | $49.40 | $41.69 | $44.35 | $41.93\nNature | $49.37 | $34.67 | $46.76 | $42.85\nSocial science | $56.91 | $48.54 | $60.94 | $49.61\nBody, mind, and spirit | $18.20 | $18.24 | $18.11 | $18.92\n\nAn intern at a publishing house who is writing a report is asked to determine which of several genres of books published in 2019 had paperbacks with the lowest average price. Consulting the table, she determines that, on average, the least expensive paperbacks in that year belonged to the genre of ______.",
    stem: "Which choice most effectively uses data from the table to complete the assertion?",
    choices: [
      { label: "A", body: "body, mind, and spirit." },
      { label: "B", body: "foreign language study." },
      { label: "C", body: "social science." },
      { label: "D", body: "nature." },
    ],
    correctLabel: "A",
    explanation: "In 2019, body, mind, and spirit paperbacks averaged $18.92 — lower than every other genre listed.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Jose Guerrero, an American abstract painter whose works are distinctive for their energetic brushstrokes, ______ frequently included in the mid-twentieth-century art movement the New York School, whose members were known for capturing the energy and chaos of modern living in paint.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "are" },
      { label: "B", body: "have been" },
      { label: "C", body: "were" },
      { label: "D", body: "is" },
    ],
    correctLabel: "D",
    explanation: 'The singular subject "Jose Guerrero" requires the singular verb "is," making the sentence "Jose Guerrero...is...frequently included."',
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      'Alternative-history fiction is a subgenre of science fiction in which plots center on "what if?" questions. What if India had started the Industrial Revolution? What if Soviet cosmonauts had been first to land on the moon? Speculative counterfactuals like these can be great fodder for stories, but they\'re also commonly deployed by academic historians to better understand factors influencing historical events. Well-realized and coherent alternative-history stories can thus complement historians\' speculations about the past.',
    stem: 'Which choice best describes the function of the underlined portion in the text as a whole? (The underlined portion reads: "What if India had started the Industrial Revolution? What if Soviet cosmonauts had been first to land on the moon?")',
    choices: [
      { label: "A", body: "It provides examples of the types of scenarios addressed in alternative-history fiction." },
      { label: "B", body: "It illustrates how academic historians have influenced writers of alternative-history fiction." },
      { label: "C", body: "It indicates specific ideas that were first raised by writers of alternative-history fiction and that subsequently inspired scholarship by academic historians." },
      { label: "D", body: "It acknowledges counterfactual questions that academic historians have largely overlooked." },
    ],
    correctLabel: "A",
    explanation: "The two questions are concrete illustrations of the kind of speculative \"what if\" premise the genre is built on.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "easy",
    stimulus:
      "The Egyptian calendar ______ three seasons: Akhet (the inundation season), Peret (the growing season), and Shemu (the harvest season).",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "had—" },
      { label: "B", body: "had" },
      { label: "C", body: "had," },
      { label: "D", body: "had;" },
    ],
    correctLabel: "B",
    explanation: 'No punctuation is needed between the verb "had" and its direct object list.',
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Some farms are expanding their mix of crop species in an effort to reduce nonagricultural biodiversity loss caused by increasing agricultural specialization, in which farmers focus on a limited range of crops or livestock species to improve yields and, thus, their revenues. To study the joint environmental and economic effects of diversification practices (which can encompass improved soil and water management as well as increased variety in crops and livestock), Laura Vang Rasmussen and team analyzed data from 2,655 farms in eleven countries. They found that using multiple diversification practices concurrently had greater potential for improving both nonagricultural biodiversity and yields than using a single strategy did. Their finding suggests that ______.",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "farmers who focus primarily on increasing crop variety without engaging in other diversification practices will likely help reverse nonagricultural biodiversity loss, but their farms will produce smaller yields than if they had continued to focus on developing a single crop." },
      { label: "B", body: "it is more expensive to increase crop variety while simultaneously implementing other diversification practices than it is to increase crop variety and then subsequently implement other diversification practices." },
      { label: "C", body: "farmers who are reluctant to switch from specializing in a single crop to cultivating a variety of crops incorrectly assume that any improvements in yields will be insufficient to offset the costs associated with making that transition." },
      { label: "D", body: "agricultural diversification doesn't inherently involve a trade-off between environmental and economic considerations, but farmers' chances of avoiding that outcome may be diminished if they focus on crop variety to the exclusion of other diversification practices." },
    ],
    correctLabel: "D",
    explanation: "Since using multiple diversification practices together improves both biodiversity and yields, diversification need not trade off environment against economics — but relying on crop variety alone (excluding other practices) reduces that potential.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Though they are in different countries, the towns of Jamame, Somalia, and Nyahururu, Kenya, ______ They are among the rare places that sit almost directly on the equator.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "do they have something in common." },
      { label: "B", body: "do have something in common?" },
      { label: "C", body: "do they have something in common?" },
      { label: "D", body: "do have something in common." },
    ],
    correctLabel: "D",
    explanation: "The sentence is a declarative statement (not a question) and needs standard subject-verb order: \"the towns...do have something in common.\"",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "easy",
    stimulus:
      "Ages of Ancestors of Four Organism Groups on Grande Terre\nOrganism group | Age of group's most recent ancestor (in millions of years)\ngrasshoppers | 4.9\nGeissois trees | 7.3\nPhyllanthus plants | 20.0\nleaf beetles | 59.9\n\nMany groups of related organisms live on the South Pacific island of Grande Terre. Scientists have collected data showing how long ago the most recent ancestor of each group lived.",
    stem: "According to the table, how long ago did the most recent ancestor of Grande Terre's leaf beetles live?",
    choices: [
      { label: "A", body: "59.9 million years ago" },
      { label: "B", body: "78.4 million years ago" },
      { label: "C", body: "30.7 million years ago" },
      { label: "D", body: "14.1 million years ago" },
    ],
    correctLabel: "A",
    explanation: "The table lists the leaf beetles' most recent ancestor at 59.9 million years ago.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "In World War II, US cryptanalyst Ann Caracristi ______ a code revealing the locations of enemy supply ships.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "to crack" },
      { label: "B", body: "cracking" },
      { label: "C", body: "having cracked" },
      { label: "D", body: "cracked" },
    ],
    correctLabel: "D",
    explanation: "The main clause needs a finite past-tense verb to state what Caracristi did; only \"cracked\" supplies one.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "The fifteenth-century English Heege Manuscript is unusual among collections of its kind and time given its focus on scary stories over more acclaimed works by celebrated medieval authors like Hoccleve. But according to professor James Wade, even more unusually, the three texts in the manuscript's first booklet were likely copied by Richard Heege from a traveling minstrel's repertoire book. The evidence includes performative elements such as the narrator directly appealing to the audience, joking about peasants and royalty, and making jokes that could be modified to refer to the town of Holbrooke when in nearby Radford to avoid giving offense.",
    stem: "As presented in the text, Wade would most likely agree with which statement about the first booklet of the Heege Manuscript?",
    choices: [
      { label: "A", body: "The texts it includes were based on stories about the area around Holbrooke and Radford, but these names were later removed." },
      { label: "B", body: "It was copied from a text that originated from a traveling minstrel who worked in the area around Holbrooke and Radford." },
      { label: "C", body: "It was likely a copy Heege intended to give to a traveling minstrel working in the area around Holbrooke and Radford." },
      { label: "D", body: "It was written down by Heege from memory based on a performance by a traveling minstrel who worked in the area around Radford and Brackonwet." },
    ],
    correctLabel: "B",
    explanation: "Wade's evidence points to the booklet being copied from a traveling minstrel's own repertoire book associated with the Holbrooke/Radford area.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Water is constantly moving and changing forms on Earth and in the atmosphere. This process is called the water cycle, and it is typically thought to consist of evaporation, condensation, and precipitation. However, the National Oceanic and Atmospheric Administration seeks ______ understanding of the water cycle to include transpiration, sublimation, and other types of water movement.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "is expanding" },
      { label: "B", body: "has expanded" },
      { label: "C", body: "to expand" },
      { label: "D", body: "expands" },
    ],
    correctLabel: "C",
    explanation: '"Seeks" is properly followed by the to-infinitive "to expand."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "The moon Dia orbits Jupiter in the same direction that the planet rotates. ______ Dia's orbit is described as prograde. Helike, another of Jupiter's moons, orbits in the opposite direction, so its orbit is described with the opposite term: retrograde.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Thus," },
      { label: "B", body: "Likewise," },
      { label: "C", body: "However," },
      { label: "D", body: "Next," },
    ],
    correctLabel: "A",
    explanation: 'Dia\'s orbit being called "prograde" is a direct consequence of its orbiting the same direction Jupiter rotates.',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "To determine the approximate age of ocher artifacts excavated from an archaeological site in China, archaeologist Fa-Gang Wang and colleagues collected samples of sediments surrounding the ocher artifacts; these samples were then analyzed using a method known as optically stimulated luminescence (OSL) dating. ______ OSL dating indicated that the ocher artifacts were between 39,000 and 41,000 years old.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "In addition," },
      { label: "B", body: "Similarly," },
      { label: "C", body: "Ultimately," },
      { label: "D", body: "By comparison," },
    ],
    correctLabel: "C",
    explanation: "This sentence reports the eventual result of the dating process described just before it, so \"Ultimately\" fits.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      'William Bowditch\'s home in Massachusetts was one of dozens of stops on the underground railroad (the network of people and places that some enslaved people used to escape to freedom). The word "underground" may lead one to assume that Bowditch kept his antislavery views a secret. ______ his views were quite well known.',
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "On the contrary," },
      { label: "B", body: "As a result," },
      { label: "C", body: "For example," },
      { label: "D", body: "Additionally," },
    ],
    correctLabel: "A",
    explanation: 'The sentence contradicts the assumption just raised, so "On the contrary" fits.',
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "The Wonderful Wizard of Oz is a 1900 novel by L. Frank Baum. In the novel, Dorothy travels to meet the Wizard of Oz, an important figure in a place called the Emerald City. The text presents a contrast between the Wizard of Oz's self-presentation and reality: ______",
    stem: "Which quotation from The Wonderful Wizard of Oz most effectively illustrates the claim?",
    choices: [
      { label: "A", body: '"[The hot air balloon] came down gradually, and I was not hurt a bit. But I found myself in the midst of a strange people, who, seeing me come from the clouds, thought I was a great Wizard."' },
      { label: "B", body: '"When I grew up I became a ventriloquist, and at that I was very well trained by a great master."' },
      { label: "C", body: '"Then Oz got into the basket and said to all the people in a loud voice: \'I am now going away to make a visit.\' "' },
      { label: "D", body: '" \'I am Oz, the Great and Terrible,\' said the little man, in a trembling voice."' },
    ],
    correctLabel: "D",
    explanation: "The grand self-declared title (\"the Great and Terrible\") spoken \"in a trembling voice\" by a \"little man\" directly contrasts self-presentation with reality.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      "The interiors of many temples in the ancient Middle East needed to satisfy a precise set of acoustic demands: the sounds of chants and hymns should travel with clarity, while profound silences should be fully felt and appreciated. In a research paper, a student claims that the users of such temple were aware of how the materials that were used within the structure could affect sound quality and that they deliberately applied this knowledge to influence how sound was experienced in the space.",
    stem: "Which quotation from a work by a historian would most directly support the student's claim?",
    choices: [
      { label: "A", body: "The acoustic environment of the temple was best suited for music that eschewed ornamentation in favor of simple melodies, harmonies, and rhythms." },
      { label: "B", body: "Many researchers believe that the central chamber of the temple had a high ceiling, a feature that has since become essential to the acoustic design of modern concert halls." },
      { label: "C", body: "During special occasions, curtains were placed inside the temple to minimize reverberation and confine the sound to designated locations." },
      { label: "D", body: "The innermost room of the temple was likely among the quietest spaces in the interior of the temple." },
    ],
    correctLabel: "C",
    explanation: "Deliberately placing curtains to control reverberation shows the users applying material knowledge to shape sound on purpose.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• There are around 90 automated snow measurement sites in Wyoming.\n• One site is at Cottonwood Creek.\n• At the start of February 2021, the site's snow depth was 75 inches.\n• At the start of March 2021, the site's snow depth was 50 inches.\n\nThe student wants to specify the snow depth at Cottonwood Creek at the start of March 2021.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "In 2021, the site at Cottonwood Creek was one of about 90 automated snow measurement stations in Wyoming." },
      { label: "B", body: "At the Cottonwood Creek site, there were 75 inches of snow on the ground at the start of February 2021." },
      { label: "C", body: "Located in Wyoming, the Cottonwood Creek site monitors snow conditions, such as snow depth." },
      { label: "D", body: "At the start of March 2021, 50 inches of snow covered the ground at the Cottonwood Creek site." },
    ],
    correctLabel: "D",
    explanation: "Only this choice states the March 2021 snow depth, which is exactly what the student wants to specify.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• There are around 90 automated snow measurement sites in Wyoming.\n• One site is at Blind Bull Summit.\n• At the start of February 2021, the site's snow depth was 68 inches.\n• At the start of March 2021, the site's snow depth was 47 inches.\n\nThe student wants to specify the snow depth at Blind Bull Summit at the start of March 2021.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "At the start of March 2021, 47 inches of snow covered the ground at the Blind Bull Summit site." },
      { label: "B", body: "At the Blind Bull Summit site, there were 68 inches of snow on the ground at the start of February 2021." },
      { label: "C", body: "Located in Wyoming, the Blind Bull Summit site monitors snow conditions, such as snow depth." },
      { label: "D", body: "In 2021, the site at Blind Bull Summit was one of about 90 automated snow measurement stations in Wyoming." },
    ],
    correctLabel: "A",
    explanation: "Only this choice states the March 2021 snow depth, which is exactly what the student wants to specify.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Elizabeth Catlett (1915–2012) was a celebrated African American artist.\n• She is best known for creating sculptures and prints that explore the Black experience.\n• Recognition is a 1970 marble sculpture by Catlett.\n• Magic Mask is a 1990 marble sculpture by Catlett.\n\nThe student wants to emphasize a similarity between the two sculptures.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Elizabeth Catlett's sculptures Recognition and Magic Mask are both made of marble." },
      { label: "B", body: "Elizabeth Catlett, a celebrated artist, was born in 1915." },
      { label: "C", body: "Recognition is a marble sculpture that celebrated artist Elizabeth Catlett created in 1970." },
      { label: "D", body: "Elizabeth Catlett was a celebrated artist who created prints as well as sculptures." },
    ],
    correctLabel: "A",
    explanation: "Only this choice names both sculptures and points out the shared material, marble.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      'While researching a topic, a student has taken the following notes:\n• The writer Effie Lee Newsome published the poem "The Bird in the Cage" (1927) in The Crisis.\n• The writer James Weldon Johnson published the poem "To America" (1917) in The Crisis.\n• The Crisis is an influential Black literary magazine.\n\nThe student wants to emphasize a similarity between Newsome and Johnson.',
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: 'A poem called "The Bird in the Cage" was published in 1927.' },
      { label: "B", body: "Both Newsome and Johnson published poems in The Crisis." },
      { label: "C", body: 'Johnson published a poem called "To America" in 1917.' },
      { label: "D", body: "The Crisis, an influential Black literary magazine, has published poetry." },
    ],
    correctLabel: "B",
    explanation: "Only this choice names both writers and states the shared fact — that both published poems in The Crisis.",
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
      "People tend to ______ the impact of acts of kindness. For example, participants in a study were asked to give a pencil to a stranger and then guess how much this action would improve the stranger's mood. The researchers found that the guesses were generally wrong: the strangers' happiness after getting the gift turned out to be greater than givers thought it would be.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "misjudge" },
      { label: "B", body: "remove" },
      { label: "C", body: "avoid" },
      { label: "D", body: "distract" },
    ],
    correctLabel: "A",
    explanation: "Givers' guesses being wrong means they misjudge the impact of their kind acts.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Ethicist Ingrid Robeyns argues that to minimize wealth inequality, there should be a legally enforceable upper limit on the wealth one person can hold. Robeyns concedes that some ______ in wealth should be tolerated—for example, some jobs are more dangerous than others, and those jobs should therefore earn a higher income than others. But this is not a license for limitless wealth inequality.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "disparity" },
      { label: "B", body: "security" },
      { label: "C", body: "confidentiality" },
      { label: "D", body: "assurances" },
    ],
    correctLabel: "A",
    explanation: "Robeyns tolerates some difference — disparity — in wealth, just not unlimited inequality.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Established in 1933 for the specific purpose of stabilizing the US banking system, ______ helped the nation recover from the Great Depression.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "the US government's many ways, just one of which was the Emergency Banking Act (EBA)," },
      { label: "B", body: "many ways, just one of which was the Emergency Banking Act (EBA), were how the US government" },
      { label: "C", body: "the US government in many ways, just one of which was the Emergency Banking Act (EBA)," },
      { label: "D", body: "the Emergency Banking Act (EBA) was just one of many ways the US government" },
    ],
    correctLabel: "D",
    explanation: 'The introductory modifier "Established in 1933..." must modify the subject that follows, which needs to be the Emergency Banking Act (EBA) itself.',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Recitals by Catherine Kautsky, known for her virtuosity on the piano, are rightly described as ______ given that they can feature not just the performance of a musical piece but also a lecture on the piece's composer and a slideshow contextualizing the time in which it was composed.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "multifaceted" },
      { label: "B", body: "circumscribed" },
      { label: "C", body: "exuberant" },
      { label: "D", body: "undiscerning" },
    ],
    correctLabel: "A",
    explanation: "Combining performance, lecture, and slideshow describes recitals with many facets — multifaceted.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Because it appears merely to reflect and rearrange the creative labor of human artists, art generated by artificial intelligence programs has been scorned by some as hackneyed. One can also argue, however, that all art is in some sense ______ because it draws on what has already been created by others for inspiration, making genuine artistic originality elusive.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "obsolete" },
      { label: "B", body: "aesthetic" },
      { label: "C", body: "counterproductive" },
      { label: "D", body: "derivative" },
    ],
    correctLabel: "D",
    explanation: 'Drawing on what already exists for inspiration is the definition of "derivative."',
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      'Seventeenth-century Flemish artist Clara Peeters played a crucial role in the history of still-life painting. At a time when historical paintings were the preferred genre—indeed, at a time when there wasn\'t even a term for still-life painting in Peeters\'s language—Peeters painted food, flowers, fish, and game. Her influence spread throughout Western Europe and she became so strongly associated with the genre that painters who took up similar subjects were sometimes described as belonging to the "circle of Peeters."',
    stem: "Which choice best states the main idea of the text?",
    choices: [
      { label: "A", body: "Clara Peeters made significant contributions to multiple genres of painting." },
      { label: "B", body: 'Clara Peeters introduced the term "still-life painting" to Western Europe.' },
      { label: "C", body: "Some paintings attributed to Clara Peeters may have been painted by other artists in her circle." },
      { label: "D", body: "Clara Peeters was an important figure in the development of still-life painting." },
    ],
    correctLabel: "D",
    explanation: "The text as a whole establishes Peeters's crucial, influential role in the development of still-life painting as a genre.",
  },
  {
    type: "multiple_choice",
    topic: "Cross-Text Connections",
    difficulty: "hard",
    stimulus:
      "Text 1\nFrance has long used gross domestic product (GDP), the market value of the goods and services produced in a given period, as a key metric for national progress and well-being. Although GDP has value as an economic metric, myriad other factors influence people's quality of life to varying degrees, and it would be wrong to assume that a rising GDP necessarily equates to increasing societal well-being.\n\nText 2\nRecognizing that a country's progress rests on both economic and noneconomic factors, in 2011 a government agency in the United Kingdom began surveying citizens to gauge quality of life. By assessing indicators in multiple domains—such as social relationships and professional and community activity—rather than relying solely on GDP, the United Kingdom gains a truer understanding of its national well-being.",
    stem: 'Based on the texts, the author of Text 1 would most likely agree with which statement about "social relationships" and "professional and community activity," mentioned in Text 2?',
    choices: [
      { label: "A", body: "They may not correlate with GDP as well in France as they do in the United Kingdom." },
      { label: "B", body: "They are a better metric of economic activity in the United Kingdom than GDP is." },
      { label: "C", body: "They have been a standard factor addressed in France's evaluation of national well-being." },
      { label: "D", body: "They may be important influences on the well-being of people in France as well as the United Kingdom." },
    ],
    correctLabel: "D",
    explanation: "Text 1's author argues that factors beyond GDP influence quality of life generally, so those noneconomic factors would plausibly matter for France's well-being too.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "easy",
    stimulus:
      "The Kaiparowits Formation is a fossil-rich layer of sedimentary rock in the Grand Staircase, a colossal sequence of rock layers stretching from Utah's Bryce Canyon to Arizona's Grand Canyon. The sandstones and mudstones of the Kaiparowits Formation were deposited ______ the Late Cretaceous, preserving many species from that time.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "during;" },
      { label: "B", body: "during:" },
      { label: "C", body: "during" },
      { label: "D", body: "during," },
    ],
    correctLabel: "C",
    explanation: 'No punctuation is needed between the preposition "during" and its object.',
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Brown Bears in Katmai National Park, Alaska\nBear identification number | Sex | Age (years) | Approximate weight (pounds)\n310 | female | 19 | 315\n132 | female | 10 | 375\n158 | male | 5 | 250\n127 | female | 4 | 225\n\nScientists collected information about brown bears in Katmai National Park in Alaska. This information included each bear's sex, age, and approximate weight. For the bear with identification number 158, for example, the scientists recorded that the bear was ______",
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      { label: "A", body: "female, 4 years old, and weighed approximately 225 pounds." },
      { label: "B", body: "female, 10 years old, and weighed approximately 375 pounds." },
      { label: "C", body: "male, 5 years old, and weighed approximately 250 pounds." },
      { label: "D", body: "female, 19 years old, and weighed approximately 315 pounds." },
    ],
    correctLabel: "C",
    explanation: "The table lists bear 158 as male, 5 years old, weighing approximately 250 pounds.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      'That Chaucer\'s Canterbury Tales inspired imitators is evident from the existence of three near-contemporary "continuations" of the collection: The Siege of Thebes, which purports to be a new tale told during the pilgrims\' ______ The Tale of Beryn, which depicts the pilgrims as tourists; and The Ploughman\'s Tale, which features a minor character from the original work.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "return" },
      { label: "B", body: "return;" },
      { label: "C", body: "return." },
      { label: "D", body: "return," },
    ],
    correctLabel: "B",
    explanation: "A semicolon is needed to separate the items of this list, since one item (The Siege of Thebes's description) itself contains a comma.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "On receiving good news, people's first instinct might be to immediately share it, but a recent experiment suggests that keeping it a secret can be psychologically beneficial. Study participants were randomly assigned to reflect on an experience in which they either shared good news or kept it to themselves. On average, those who kept good news secret reported feeling more energized by the experience than participants who shared did, perhaps, as the researchers suggest, because the choice to savor good news is usually a personal one and autonomous motivation is linked with feelings of vitality.",
    stem: 'Which choice best describes the function of the underlined portion in the text as a whole? (The underlined portion reads: "On receiving good news, people\'s first instinct might be to immediately share it,")',
    choices: [
      { label: "A", body: "It presents a scenario whose psychological impact was investigated in the study summarized in the text." },
      { label: "B", body: "It indicates a reason why skepticism about the conclusions of the psychological study mentioned in the text is likely warranted." },
      { label: "C", body: "It reports the main conclusion of a study into a social phenomenon whose methodology is critiqued in the text." },
      { label: "D", body: "It provides an observation about human behavior that was validated by the experiment summarized in the text." },
    ],
    correctLabel: "A",
    explanation: "The underlined portion sets up the instinct to share news, which is exactly the behavior the described study goes on to investigate.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      "As part of his effort to identify Bronze Age pathways across Sicily, archaeologist Dario Calderone created three-dimensional digital models of the terrain via aerial photogrammetry. The drone ______ the landscape, which included archaeological sites from as far back as the Early Neolithic Period, flew in a pattern that ensured 60 percent forward overlap and 20 percent side overlap between individual images.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "photographed" },
      { label: "B", body: "was photographing" },
      { label: "C", body: "photographing" },
      { label: "D", body: "photographs" },
    ],
    correctLabel: "C",
    explanation: '"Photographing the landscape..." forms a participial phrase modifying "the drone," leaving "flew" as the sentence\'s finite main verb.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      'In economics, mustard seeds are considered a commodity because they are essentially interchangeable, "essentially" being a word that admits a degree of latitude. In 2021, researchers J. Shorish, M. Stephenson, and M. Zargham devised a mathematical model of fungibility (interchangeability) that would account for such variation. Distinguishing "exactly the same" and "nearly the same" commodities—whether crops, lumber, or precious metals—______ among their primary aims.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "having been" },
      { label: "B", body: "being" },
      { label: "C", body: "was" },
      { label: "D", body: "were" },
    ],
    correctLabel: "C",
    explanation: 'The gerund phrase "Distinguishing..." acts as a singular subject, requiring the singular past-tense verb "was."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "easy",
    stimulus: "The Earth's inner core ______ primarily of iron and nickel.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "to consist" },
      { label: "B", body: "consisting" },
      { label: "C", body: "having consisted" },
      { label: "D", body: "consists" },
    ],
    correctLabel: "D",
    explanation: 'The subject "the Earth\'s inner core" needs a finite present-tense verb, "consists."',
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "Bioluminescence is most commonly found among marine organisms: 70% of known luminescent species inhabit ocean environments. This trait is remarkably stable and has evolved independently in many marine species over time. Light-emitting marine species, like the Humboldt squid with its flashing light displays, exhibit accelerated diversification compared to nonluminescent relatives. This increased genetic variety among related light-emitting species further underscores bioluminescence's crucial role in marine biodiversity and evolution.",
    stem: 'Which choice best describes the function of the underlined portion in the text as a whole? (The underlined portion reads: "70% of known luminescent species inhabit ocean environments.")',
    choices: [
      { label: "A", body: "To provide a statistical comparison between two categories of bioluminescent species that is elaborated on in the rest of the text" },
      { label: "B", body: "To present a scientific finding that the text's discussion of the evolutionary history of bioluminescence calls into question" },
      { label: "C", body: "To provide data that support an argument made in the text about a particular light-emitting ocean species" },
      { label: "D", body: "To support the text's assertion that bioluminescence is associated with particular environments" },
    ],
    correctLabel: "D",
    explanation: "The statistic establishes that bioluminescence is concentrated in ocean environments, directly supporting the claim that it is tied to particular environments.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "easy",
    stimulus:
      "Percentage of City's Commuters Regularly Biking to Work in 2016\nCity | % of commuters\nMinneapolis, Minnesota | 3.7\nHouston, Texas | 0.5\nDavis, California | 16.6\nMadison, Wisconsin | 4.9\n\nThe table shows that in 2016, the percentage of commuters who regularly biked to work in Minneapolis, Minnesota, was ______",
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      { label: "A", body: "16.6." },
      { label: "B", body: "0.5." },
      { label: "C", body: "4.9." },
      { label: "D", body: "3.7." },
    ],
    correctLabel: "D",
    explanation: "The table lists Minneapolis's rate as 3.7%.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      'While researching a topic, a student has taken the following notes:\n• India Arie is an African American singer and songwriter.\n• The media outlet BBC Music has described her music as a "blend of hip hop, soul and folk [that is] as subtle as it [is] inspired."\n• Her first studio album, Acoustic Soul, was released in 2001.\n• It features the song "Strength, Courage & Wisdom."\n• Avery Johnson played bass on the album.\n\nThe student wants to introduce Acoustic Soul to an audience already familiar with India Arie.',
    stem: "Which choice most effectively uses information from the given sentences to introduce Acoustic Soul to an audience already familiar with India Arie?",
    choices: [
      { label: "A", body: "Avery Johnson played bass on singer and songwriter India Arie's 2001 album, Acoustic Soul." },
      { label: "B", body: 'India Arie\'s music has been described as a "blend of hip hop, soul and folk [that is] as subtle as it [is] inspired."' },
      { label: "C", body: 'Featuring the song "Strength, Courage & Wisdom," Acoustic Soul is India Arie\'s first studio album.' },
      { label: "D", body: '"Strength, Courage & Wisdom," a song by singer and songwriter India Arie, is featured on the album Acoustic Soul.' },
    ],
    correctLabel: "C",
    explanation: "Since the audience already knows India Arie, this choice leads with the album (not another introduction of the artist) and names it as her first studio album.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      "Traveling to India between 1935 and 1952, African American intellectuals Sue Bailey Thurman, Blanche Wright Nelson, and Sadie T.M. Alexander met with Mahatma Gandhi, an influential proponent of nonviolent resistance, and forged meaningful connections with local Indian women as part of an effort to promote women's ______ but also around the world.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "empowerment—not only in India—" },
      { label: "B", body: "empowerment not only in India," },
      { label: "C", body: "empowerment, not only in India," },
      { label: "D", body: "empowerment—not only in India" },
    ],
    correctLabel: "D",
    explanation: 'A single dash pairs with the dash before "but also" to set off the interrupting phrase "not only in India."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "The legacy of the Spanish Empire, which once controlled portions of five continents, is evident in Spanish-speaking Honduras, one of many places that reveal their imperial history in their language. Contrast Honduras with Taiwan, which ceased to be part of the empire in ______ the latter's connection to the empire is so attenuated that Spanish is seldom spoken there today.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "1642," },
      { label: "B", body: "1642 and" },
      { label: "C", body: "1642:" },
      { label: "D", body: "1642" },
    ],
    correctLabel: "C",
    explanation: "A colon correctly introduces the explanation of why Taiwan's imperial connection is attenuated.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "In a given rock formation, Rhaetian rock from 208.5 million years ago might directly abut Lochkovian rock from 419.2 million years ago, with millions of years of material missing in between. ______ time did not stand still during these intervening years; the unaccounted-for sedimentary material was likely removed from the stratigraphic record via erosion and weathering.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "In particular," },
      { label: "B", body: "Of course," },
      { label: "C", body: "On the contrary," },
      { label: "D", body: "As a result," },
    ],
    correctLabel: "B",
    explanation: 'The sentence concedes an obvious point before explaining the missing material, matching "Of course."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "In a 1993 study by Vales and Peek, the researchers used microhistological fecal analysis to determine the ratio of three plant subtypes (graminoids, forbs, and browse) within the diets of North American ungulates. The researchers did not perform this analysis on all such ungulates, ______ they focused exclusively on elk in Wyoming.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "for instance;" },
      { label: "B", body: "regardless;" },
      { label: "C", body: "however;" },
      { label: "D", body: "in other words;" },
    ],
    correctLabel: "A",
    explanation: "The elk-in-Wyoming detail is presented as a specific instance illustrating the researchers' narrower focus.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "When it was built in the nineteenth century, the Eiffel Tower was criticized—even protested—for its unique appearance. ______ the spire-like structure earned not just acceptance but adoration, and its iconic design is now echoed in everything from the Eiffel Tower replica in Klagenfurt, Austria, to the Tokyo Tower in Tokyo, Japan.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "For example," },
      { label: "B", body: "Thus," },
      { label: "C", body: "Ultimately," },
      { label: "D", body: "Similarly," },
    ],
    correctLabel: "C",
    explanation: 'The sentence describes the eventual outcome after the earlier criticism, matching "Ultimately."',
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Since 2012, a consortium of research institutions has released an annual report that ranks countries by their populations' well-being, which the authors of the report derive using data from a globally administered survey of respondents' self-assessed levels of happiness. However, some other scholars caution that this approach reflects a tendentious understanding of the relationship between these two metrics. For example, studies have revealed a tendency among people in some non-Western countries to regard individual happiness as less important to their well-being than other ideals (e.g., a sense of harmony or balance).",
    stem: "Based on the text, what is a potential weakness of the annual report issued by the consortium of research institutions?",
    choices: [
      { label: "A", body: "It includes survey data from a wide range of Western countries but only from a narrow set of non-Western countries." },
      { label: "B", body: "It overlooks how philosophies regarding a particular concept have evolved over time." },
      { label: "C", body: "It may not adequately account for cultural variations in the value attached to a particular concept." },
      { label: "D", body: "It relies on survey responses from participants who may not be representative of their countries' cultural norms." },
    ],
    correctLabel: "C",
    explanation: "The report equates well-being with self-assessed happiness, but happiness is valued differently across cultures — a cultural-variation weakness.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "There is a growing belief that teaching medical students about art alongside standard science and clinical coursework helps them become more observant, develop greater patient empathy, and strengthen their communication skills. But some medical program educators are skeptical, questioning if arts and humanities experiences can be clearly shown to have any worthwhile advantages for their students. Research into the effectiveness of arts programs for medical students by Neha Mukunda and her colleagues found that evidence is largely anecdotal and based on studies that were short in duration, limited to single institutions, or restricted to small numbers of students. To strengthen the evidence base in support of incorporating humanities into the coursework for medical students, then, ______",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "researchers must prove that scientific training alone is insufficient for developing clinical skills." },
      { label: "B", body: "larger-scale, multi-institutional research studies tracking outcomes for medical students over longer periods are needed." },
      { label: "C", body: "medical schools should highlight more student testimonials about how arts education benefits their clinical abilities." },
      { label: "D", body: "institutions may need to provide medical students with exposure to larger numbers of artworks than have been used in previous studies." },
    ],
    correctLabel: "B",
    explanation: "Since the weaknesses identified are short duration, single institutions, and small samples, the logical fix is larger, longer, multi-institutional studies.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Sheet music contains many notations that instruct the musician on how to perform the piece.\n• The notation pp stands for pianissimo.\n• It means the piece should be performed at a very quiet volume.\n• The notation mf stands for mezzo forte.\n• It means the piece should be performed at a moderately loud volume.\n\nThe student wants to explain what pp stands for in sheet music.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Pianissimo and mezzo forte are two examples of notations that can appear on sheet music." },
      { label: "B", body: "The notation mf, which stands for mezzo forte, is used in sheet music." },
      { label: "C", body: "In sheet music, the notation pp stands for pianissimo, which means the piece should be performed very quietly." },
      { label: "D", body: "A piece of sheet music can contain a range of notations, such as pp or mf." },
    ],
    correctLabel: "C",
    explanation: "Only this choice explains what pp stands for and what it means, which is exactly the student's goal.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The Highpointers Club is a hiking club.\n• One of the main goals among club members is to reach the highest points in all fifty US states.\n• Those who achieve this are called 50 Completers.\n• In Suk Han became a 50 Completer on November 15, 2013.\n• The highest point in Michigan is Mount Arvon, at 1,979 ft.\n• The highest point in New Mexico is Wheeler Peak, at 13,167 ft.\n\nThe student wants to explain the 50 Completers hiking challenge to a new audience.",
    stem: "Which choice most effectively uses information from the given sentences to explain the 50 Completers hiking challenge to a new audience?",
    choices: [
      { label: "A", body: "Hikers aiming to count themselves among the 50 Completers must reach not only Michigan's Mount Arvon but also the even higher peak of Wheeler Peak in New Mexico." },
      { label: "B", body: "Not until after you have reached the highest points in all fifty US states—including Mount Arvon in Michigan and Wheeler Peak in New Mexico—can you include yourself among the 50 Completers of the Highpointers Club." },
      { label: "C", body: "If you are looking for a new hiking challenge, consider joining the Highpointers Club, as did In Suk Han, a hiker who successfully reached the highest point in every US state." },
      { label: "D", body: 'The statement "all bats use echolocation" is not falsifiable, while "some bats use echolocation" is falsifiable.' },
    ],
    correctLabel: "B",
    explanation: "Only this choice explains the full 50 Completers requirement (highest points in all fifty states) with concrete examples, which is the challenge itself.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "hard",
    stimulus:
      'While researching a topic, a student has taken the following notes:\n• It is generally accepted that all bats use echolocation to navigate.\n• The statement "all bats use echolocation to navigate" is falsifiable.\n• A falsifiable statement can theoretically be proved false by observation.\n• "All bats use echolocation to navigate" could be falsified by observing a single bat that didn\'t use echolocation.\n• The statement "some bats use echolocation to navigate" is not falsifiable.\n• Falsifying it would require observing every bat in the universe, which is not possible.\n\nThe student wants to contrast the falsifiability of two statements about bats.',
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: 'One could theoretically observe a single bat that didn\'t use echolocation; however, one could not falsify the statement "some bats use echolocation to navigate."' },
      { label: "B", body: 'The statement "some bats use echolocation to navigate" could be falsified by observing every bat in the universe, but it is not possible to falsify the statement "all bats use echolocation to navigate."' },
      { label: "C", body: 'The statement "all bats use echolocation to navigate" could be proved false by observing a single bat that didn\'t use echolocation, whereas falsifying "some bats use echolocation to navigate" would require observing every bat in the universe, which is not possible.' },
      { label: "D", body: 'The statement "all bats use echolocation to navigate" is not falsifiable because it would require observing every bat, whereas the statement "some bats use echolocation to navigate" can be falsified by observing a single bat that does not use echolocation.' },
    ],
    correctLabel: "C",
    explanation: "Only this choice correctly contrasts both statements' falsifiability with the correct reasoning attached to each.",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 1 (22 questions)
// ---------------------------------------------------------------------------

const MATH_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Nonlinear functions",
    difficulty: "medium",
    stem: "f(x) = 23(1.20)^(x/4)\n\nFor the given function f, the value of f(x) increases by p% for every increase of x by 8. What is the value of p?",
    choices: [
      { label: "A", body: "20" },
      { label: "B", body: "31" },
      { label: "C", body: "40" },
      { label: "D", body: "44" },
    ],
    correctLabel: "D",
    explanation: "An increase of x by 8 raises the exponent x/4 by 2, so f(x) is multiplied by 1.20² = 1.44 — a 44% increase.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential models",
    difficulty: "medium",
    stem: "A model estimates that in a particular forest, the number of trees with any given diameter measured at shoulder height is 21% less for each 1-inch increase in tree diameter measured at shoulder height. The model can be written in the form f(x) = ab^x, where a and b are constants and x is the tree's diameter, in inches, measured at shoulder height, and x ≥ 5. The model estimates that 3,100 trees in this forest have a diameter of 13 inches measured at shoulder height. Which function best represents this model?",
    choices: [
      { label: "A", body: "f(x) = 3,100 · 0.21^x" },
      { label: "B", body: "f(x) = 3,100 · 0.79^x" },
      { label: "C", body: "f(x) = 66,000 · 0.21^x" },
      { label: "D", body: "f(x) = 66,000 · 0.79^x" },
    ],
    correctLabel: "D",
    explanation: "A 21% decrease per inch gives base b = 0.79, and solving a · 0.79¹³ ≈ 3,100 gives a ≈ 66,000.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / scatterplots",
    difficulty: "medium",
    stem: "The scatterplot shows the relationship between two variables, t and d, with a line of best fit that passes approximately through the points (235, 415) and (268, 481). Which of the following equations is the most appropriate linear model for the data shown?",
    choices: [
      { label: "A", body: "d = −60.1 + 2.02t" },
      { label: "B", body: "d = 160.1 + 2.02t" },
      { label: "C", body: "d = 359.8 + 2.02t" },
      { label: "D", body: "d = 394.8 + 2.02t" },
    ],
    correctLabel: "A",
    explanation: "The slope between the two points is about 2.02, and extending the line back to t = 0 gives a d-intercept of about −60.1.",
  },
  {
    type: "multiple_choice",
    topic: "Nonlinear functions",
    difficulty: "hard",
    stem: "The function f is defined by f(x) = a^x − b, where a and b are constants. In the xy-plane, the graph of y = f(x) passes through the points (c, 11) and (2c, 221), where c is a constant. Which of the following could be the value of b?",
    choices: [
      { label: "A", body: "4" },
      { label: "B", body: "25" },
      { label: "C", body: "210" },
      { label: "D", body: "232" },
    ],
    correctLabel: "A",
    explanation: "Letting y = aᶜ, the two conditions give y − b = 11 and y² − b = 221; solving yields b = 4 (the positive solution).",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — similarity",
    difficulty: "medium",
    stem: "In triangle ABC, the measure of angle A is 56° and AC = 30. In triangle PQR, the measure of angle P is 56° and PR = 90. Which additional piece of information is sufficient to prove that triangle ABC is similar to triangle PQR?",
    choices: [
      { label: "A", body: "AB = 20 and PQ = 20." },
      { label: "B", body: "AB = 20 and QR = 60." },
      { label: "C", body: "The measures of angle B and angle R are 48° and 76°, respectively." },
      { label: "D", body: "The measures of angle B and angle Q are 56° and 48°, respectively." },
    ],
    correctLabel: "C",
    explanation: "With angle A = angle P = 56°, matching angle B = 48° with angle R = 76° gives angle C = 76° and angle Q = 48°, so all three angle pairs match (AA similarity).",
  },
  {
    type: "student_response",
    topic: "Quadratic equations",
    difficulty: "hard",
    stem: "(5/9)(5x + 9)(x + √(5k + 9))(x − √(5k + 9)) = 0\n\nIn the given equation, k is a positive constant. The product of the solutions to the equation is 81. What is the value of k?",
    correctResponse: "7.2",
    explanation: "The three roots are −9/5, √(5k+9), and −√(5k+9); their product is (9/5)(5k+9) = 81, giving k = 36/5 = 7.2.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "hard",
    stem: "4x² − px + w = −86\n\nIn the given equation, p and w are integer constants. The equation has exactly one real solution. Which is NOT a possible value of w?",
    choices: [
      { label: "A", body: "−22" },
      { label: "B", body: "14" },
      { label: "C", body: "25" },
      { label: "D", body: "314" },
    ],
    correctLabel: "C",
    explanation: "A single real solution requires p² = 16(w + 86), so w + 86 must be a perfect square; w = 25 gives 111, which is not a perfect square.",
  },
  {
    type: "multiple_choice",
    topic: "Rational equations",
    difficulty: "medium",
    stem: "If (x + 6)/5 = (x + 6)/(−13), the value of x + 6 is between which of the following pairs of values?",
    choices: [
      { label: "A", body: "−7 and −5" },
      { label: "B", body: "−2 and 2" },
      { label: "C", body: "2 and 7" },
      { label: "D", body: "8 and 13" },
    ],
    correctLabel: "B",
    explanation: "A value equal to two different nonzero multiples of itself must be 0, so x + 6 = 0, which falls between −2 and 2.",
  },
  {
    type: "student_response",
    topic: "Factoring",
    difficulty: "hard",
    stem: "The expression 6x⁴ + 17x² + 5 can be rewritten as (3x² + a)(2x² + b), where a and b are positive integers, or as (3x² + c)(2x² + d), where c and d are positive nonintegers. What is the value of a + c?",
    correctResponse: "8.5",
    explanation: "The integer factoring gives a = 1, b = 5; solving the same system for a noninteger root gives c = 7.5, so a + c = 8.5.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / scatterplots",
    difficulty: "medium",
    stem: "The scatterplot shows the relationship between two variables, x and y. A line of best fit is also shown, passing through approximately (0, 9.5) and (14, 4). Which of the following equations best represents the line of best fit shown?",
    choices: [
      { label: "A", body: "y = 9.5 + 0.4x" },
      { label: "B", body: "y = 9.5 − 0.4x" },
      { label: "C", body: "y = −9.5 + 0.4x" },
      { label: "D", body: "y = −9.5 − 0.4x" },
    ],
    correctLabel: "B",
    explanation: "The line falls from a y-intercept of about 9.5 with a slope of about −0.4.",
  },
  {
    type: "multiple_choice",
    topic: "Functions",
    difficulty: "easy",
    stem: "The graph of the polynomial function f in the xy-plane, where y = f(x), passes through the point (9, 8). Which of the following must be true?",
    choices: [
      { label: "A", body: "f(0) = 8" },
      { label: "B", body: "f(8) = 9" },
      { label: "C", body: "f(9) = 0" },
      { label: "D", body: "f(9) = 8" },
    ],
    correctLabel: "D",
    explanation: "A point (9, 8) on the graph of y = f(x) means f(9) = 8 by definition.",
  },
  {
    type: "student_response",
    topic: "Exponential functions",
    difficulty: "medium",
    stem: "For the exponential function g, the value of g(x) doubles for every increase of 2 in the value of x. If g(4) = 9, what is the value of g(6)?",
    correctResponse: "18",
    explanation: "Since x = 6 is 2 more than x = 4, g(6) = 2 · g(4) = 18.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / graphs",
    difficulty: "medium",
    stem: "Sunspots are temporary dark spots on the surface of the Sun. The monthly mean number of sunspots for one calendar month is the average of the number of sunspots observed each day during the month. The linear function s models the monthly mean number of sunspots as a function of the number of months, x, since December 2013, where 0 ≤ x ≤ 30. The graph of y = s(x) is a line that starts at approximately 120 sunspots when x = 0 and decreases at a fairly constant rate to approximately 45 sunspots when x = 30. Which of the following is the best estimate for the monthly mean number of sunspots in December 2014?",
    choices: [
      { label: "A", body: "61" },
      { label: "B", body: "71" },
      { label: "C", body: "81" },
      { label: "D", body: "91" },
    ],
    correctLabel: "D",
    explanation: "December 2014 is 12 months after December 2013; following the line's rate of decline gives an estimate closest to 91.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "easy",
    stem: "What is the x-intercept of a line in the xy-plane that has a slope of −4/7 and passes through the point (0, 12)?",
    choices: [
      { label: "A", body: "(−21, 0)" },
      { label: "B", body: "(−4, 0)" },
      { label: "C", body: "(7, 0)" },
      { label: "D", body: "(21, 0)" },
    ],
    correctLabel: "D",
    explanation: "Setting y = 0 in y = −(4/7)x + 12 gives x = 21.",
  },
  {
    type: "multiple_choice",
    topic: "Inequalities",
    difficulty: "medium",
    stem: "In the xy-plane, a dashed boundary line has a slope of 4 and a y-intercept of 1. The shaded region lies below this line. Which inequality represents the shaded region?",
    choices: [
      { label: "A", body: "y < (1/4)x + 1" },
      { label: "B", body: "y < 4x + 1" },
      { label: "C", body: "y > (1/4)x + 1" },
      { label: "D", body: "y > 4x + 1" },
    ],
    correctLabel: "B",
    explanation: "A dashed line means strict inequality, and shading below the line y = 4x + 1 gives y < 4x + 1.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "easy",
    stem: "y = 5x + 18\ny = 5x − 18\n\nHow many solutions does the given system of equations have?",
    choices: [
      { label: "A", body: "Zero" },
      { label: "B", body: "Exactly one" },
      { label: "C", body: "Exactly two" },
      { label: "D", body: "Infinitely many" },
    ],
    correctLabel: "A",
    explanation: "The two lines have the same slope but different y-intercepts, so they are parallel and never intersect.",
  },
  {
    type: "multiple_choice",
    topic: "Trigonometry",
    difficulty: "medium",
    stem: "In the figure, triangle ACE has a right angle at E, with point B on segment AC and point D on segment CE such that BD is perpendicular to CE. If cos A = 0.65, what is the value of sin C?",
    choices: [
      { label: "A", body: "0.87" },
      { label: "B", body: "0.65" },
      { label: "C", body: "0.35" },
      { label: "D", body: "0.13" },
    ],
    correctLabel: "B",
    explanation: "In right triangle ACE, angles A and C are complementary, so sin C = cos A = 0.65.",
  },
  {
    type: "student_response",
    topic: "Functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = 3x − 7 and f(b) = 4/5. What is the value of b?",
    correctResponse: "2.6",
    explanation: "3b − 7 = 4/5, so 3b = 7.8 and b = 2.6.",
  },
  {
    type: "multiple_choice",
    topic: "Absolute value equations",
    difficulty: "medium",
    stem: "9|7 − x| + 5 = 95\n\nWhat is the sum of the solutions to the given equation?",
    choices: [
      { label: "A", body: "14" },
      { label: "B", body: "10" },
      { label: "C", body: "−3" },
      { label: "D", body: "−14" },
    ],
    correctLabel: "A",
    explanation: "|7 − x| = 10, so x = −3 or x = 17; their sum is 14.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "medium",
    stem: "f(x) = x² − 4x − 780\n\nThe function f is defined by the given equation. Which of the following equivalent forms of the equation displays the minimum value of the function as a constant or coefficient?",
    choices: [
      { label: "A", body: "f(x) = x² − 4x + 195" },
      { label: "B", body: "f(x) = (x − 2)² + (−784)" },
      { label: "C", body: "f(x) = x(x − 4) + (−780)" },
      { label: "D", body: "f(x) = (x + 26)(x − 30)" },
    ],
    correctLabel: "B",
    explanation: "Vertex form (x − 2)² + (−784) directly displays the minimum value, −784, as a constant.",
  },
  {
    type: "student_response",
    topic: "Quadratic graphs",
    difficulty: "hard",
    stem: "The graph of y = 6x² + bx + c is shown in the xy-plane, where b and c are constants. The graph has a y-intercept of (0, −6) and passes through the point (1, 6). What is the value of bc?",
    correctResponse: "-36",
    explanation: "The y-intercept gives c = −6, and substituting (1, 6) gives 6 + b − 6 = 6, so b = 6; therefore bc = −36.",
  },
  {
    type: "multiple_choice",
    topic: "Percentages",
    difficulty: "medium",
    stem: "The value of a painting increased by 166% from the end of 2011 to the end of 2012 and then decreased by 14% from the end of 2012 to the end of 2013. What was the net percentage increase in the value of the painting from the end of 2011 to the end of 2013?",
    choices: [
      { label: "A", body: "128.76%" },
      { label: "B", body: "142.76%" },
      { label: "C", body: "152.00%" },
      { label: "D", body: "203.24%" },
    ],
    correctLabel: "A",
    explanation: "Multiplying 2.66 × 0.86 = 2.2876, a net increase of 128.76%.",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 2 (22 questions)
// ---------------------------------------------------------------------------

const MATH_MODULE_2: QuestionInput[] = [
  {
    type: "student_response",
    topic: "Unit conversion",
    difficulty: "medium",
    stem: "An object's speed is increasing at a rate of 12.60 meters per second squared. What is this rate, in miles per minute squared, rounded to the nearest tenth? (Use 1 mile = 1,609 meters.)",
    correctResponse: "28.2",
    explanation: "12.60 m/s² × (1 mile / 1,609 m) × (60 s/min)² = 45,360 / 1,609 ≈ 28.2 miles per minute squared.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations — modeling",
    difficulty: "medium",
    stem: "A chemist mixed x liters of a 6% saline solution with y liters of a 9% saline solution to produce a 7% saline solution. Which equation best represents this situation? (Assume the volumes of the solutions are additive.)",
    choices: [
      { label: "A", body: "0.06x + 0.09y = 7(x + y)" },
      { label: "B", body: "0.06x + 0.09y = 0.07(x + y)" },
      { label: "C", body: "0.6x + 0.9y = 7(x + y)" },
      { label: "D", body: "0.6x + 0.9y = 0.7(x + y)" },
    ],
    correctLabel: "B",
    explanation: "The total salt from each solution must equal 7% of the total combined volume: 0.06x + 0.09y = 0.07(x + y).",
  },
  {
    type: "student_response",
    topic: "Polynomial expressions",
    difficulty: "easy",
    stem: "The expression (3x + 5)(7x − 8) can be written in the form ax² + bx + c, where a, b, and c are constants. What is the value of a + b?",
    correctResponse: "32",
    explanation: "Expanding gives 21x² + 11x − 40, so a = 21, b = 11, and a + b = 32.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic word problems",
    difficulty: "medium",
    stem: "A rectangle has a length of x units and a width of x − 3 units. If the rectangle has an area of 28 square units, what is the value of x?",
    choices: [
      { label: "A", body: "4" },
      { label: "B", body: "7" },
      { label: "C", body: "11" },
      { label: "D", body: "28" },
    ],
    correctLabel: "B",
    explanation: "x(x − 3) = 28 factors as (x − 7)(x + 4) = 0, and the positive solution is x = 7.",
  },
  {
    type: "student_response",
    topic: "Inequalities",
    difficulty: "easy",
    stem: "A number x is at most 27 less than 3 times the value of y. If the value of y is 8, what is the greatest possible value of x?",
    correctResponse: "-3",
    explanation: "x ≤ 3y − 27, so with y = 8, x ≤ 24 − 27 = −3; the greatest possible value is −3.",
  },
  {
    type: "multiple_choice",
    topic: "Rational equations",
    difficulty: "medium",
    stem: "1/(x − 3) = (x − 1)/(−x + 1.75)\n\nWhich of the following is a solution to the given equation?",
    choices: [
      { label: "A", body: "0.75" },
      { label: "B", body: "2.5" },
      { label: "C", body: "3" },
      { label: "D", body: "4" },
    ],
    correctLabel: "B",
    explanation: "Cross-multiplying gives x² − 3x + 1.25 = 0, whose solutions are x = 2.5 and x = 0.5; only 2.5 is among the choices.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "medium",
    stem: "Number of cars | Maximum number of passengers and crew\n2 | 81\n5 | 189\n10 | 369\n\nThe table shows the linear relationship between the number of cars, c, on a commuter train and the maximum number of passengers and crew, p, that the train can carry. Which equation represents the linear relationship between c and p?",
    choices: [
      { label: "A", body: "36c − p = −9" },
      { label: "B", body: "36c − p = 9" },
      { label: "C", body: "36p − c = −9" },
      { label: "D", body: "36p − c = 9" },
    ],
    correctLabel: "A",
    explanation: "The slope is 36 and the intercept is 9 (p = 36c + 9), which rearranges to 36c − p = −9.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "20x = 1,200y − 2,000\n\nOne of the two equations in a system of linear equations is given. The system has no solution. Which equation could be the second equation in this system?",
    choices: [
      { label: "A", body: "(1/20)x = 3y" },
      { label: "B", body: "(1/20)x = 60y − 100" },
      { label: "C", body: "x = 3y" },
      { label: "D", body: "x = 60y − 100" },
    ],
    correctLabel: "A",
    explanation: "The given equation simplifies to (1/20)x − 3y = −5; choice A has the same coefficients but a different constant, making the lines parallel with no solution.",
  },
  {
    type: "student_response",
    topic: "Geometry — circles",
    difficulty: "hard",
    stem: "A circle has center G, and points M and N lie on the circle. Line segments MH and NH are tangent to the circle at points M and N, respectively. If the radius of the circle is 247 millimeters and the perimeter of quadrilateral GMHN is 5,174 millimeters, what is the distance, in millimeters, between points G and H?",
    correctResponse: "2353",
    explanation: "Since GM = GN = 247 and MH = NH = (5,174 − 494)/2 = 2,340, right triangle GMH gives GH = √(247² + 2,340²) = 2,353.",
  },
  {
    type: "multiple_choice",
    topic: "Trigonometry",
    difficulty: "hard",
    stem: "In triangle JKL, the measure of angle J is 90b°, the measure of angle K is 66a°, and the measure of angle L is 24a°, where a and b are constants. Which of the following must be true?",
    choices: [
      { label: "A", body: "cos L > sin K" },
      { label: "B", body: "cos L = sin K" },
      { label: "C", body: "cos L < sin K" },
      { label: "D", body: "There is not enough information to compare the values of cos L and sin K." },
    ],
    correctLabel: "D",
    explanation: "Angle J is only guaranteed to be 90° if a = b = 1; for other valid values of a and b, K and L are not complementary, so cos L and sin K cannot be reliably compared.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / graphs",
    difficulty: "medium",
    stem: "Sunspots are temporary dark spots on the surface of the Sun. The monthly mean number of sunspots for one calendar month is the average of the number of sunspots observed each day during the month. The linear function s models the monthly mean number of sunspots as a function of the number of months, x, since April 2015, where 0 ≤ x ≤ 30. The graph of y = s(x) is a line that starts at approximately 80 sunspots when x = 0 and decreases at a fairly constant rate to approximately 5 sunspots when x = 30. Which of the following is the best estimate for the monthly mean number of sunspots in April 2016?",
    choices: [
      { label: "A", body: "23" },
      { label: "B", body: "33" },
      { label: "C", body: "43" },
      { label: "D", body: "53" },
    ],
    correctLabel: "D",
    explanation: "April 2016 is 12 months after April 2015; following the line's rate of decline gives an estimate closest to 53.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "easy",
    stem: "For the linear function f, the graph of y = f(x) in the xy-plane has a slope of −4 and passes through the point (3, −5). Which equation defines f?",
    choices: [
      { label: "A", body: "f(x) = 3x − 5" },
      { label: "B", body: "f(x) = −4x − 5" },
      { label: "C", body: "f(x) = −4x − 4" },
      { label: "D", body: "f(x) = −4x + 7" },
    ],
    correctLabel: "D",
    explanation: "Using point-slope form with slope −4 through (3, −5): −5 = −4(3) + b gives b = 7, so f(x) = −4x + 7.",
  },
  {
    type: "multiple_choice",
    topic: "Inequalities",
    difficulty: "medium",
    stem: "In the xy-plane, a dashed boundary line has a slope of 3 and a y-intercept of 5. The shaded region lies below this line. Which inequality represents the shaded region?",
    choices: [
      { label: "A", body: "y < (1/3)x + 5" },
      { label: "B", body: "y < 3x + 5" },
      { label: "C", body: "y > (1/3)x + 5" },
      { label: "D", body: "y > 3x + 5" },
    ],
    correctLabel: "B",
    explanation: "A dashed line means strict inequality, and shading below the line y = 3x + 5 gives y < 3x + 5.",
  },
  {
    type: "student_response",
    topic: "Geometry — circles",
    difficulty: "easy",
    stem: "A circle has a radius of 4.3 inches. The area of the circle is bπ square inches, where b is a constant. What is the value of b?",
    correctResponse: "18.49",
    explanation: "The area is πr² = π(4.3)² = 18.49π, so b = 18.49.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of inequalities",
    difficulty: "medium",
    stem: "y ≤ x + 8\ny ≥ −3x − 8\n\nWhich point (x, y) is a solution to the given system of inequalities in the xy-plane?",
    choices: [
      { label: "A", body: "(0, −9)" },
      { label: "B", body: "(0, 9)" },
      { label: "C", body: "(−5, 0)" },
      { label: "D", body: "(5, 0)" },
    ],
    correctLabel: "D",
    explanation: "At (5, 0): 0 ≤ 13 is true and 0 ≥ −23 is true, so (5, 0) satisfies both inequalities.",
  },
  {
    type: "student_response",
    topic: "Radicals",
    difficulty: "medium",
    stem: "If 3√3 + 6√27 − √48 can be rewritten as x√3, then what is the value of x?",
    correctResponse: "17",
    explanation: "6√27 = 18√3 and √48 = 4√3, so 3√3 + 18√3 − 4√3 = 17√3, giving x = 17.",
  },
  {
    type: "multiple_choice",
    topic: "Absolute value equations",
    difficulty: "medium",
    stem: "7|6 − x| + 3 = 73\n\nWhat is the sum of the solutions to the given equation?",
    choices: [
      { label: "A", body: "12" },
      { label: "B", body: "10" },
      { label: "C", body: "−4" },
      { label: "D", body: "−12" },
    ],
    correctLabel: "A",
    explanation: "|6 − x| = 10, so x = −4 or x = 16; their sum is 12.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "(8cx + 7)/5 = 4x − 7\n\nIn the given equation, c is a constant. If the equation has no solution, what is the value of c?",
    choices: [
      { label: "A", body: "5/2" },
      { label: "B", body: "2/5" },
      { label: "C", body: "−2/5" },
      { label: "D", body: "−5/2" },
    ],
    correctLabel: "A",
    explanation: "Rewriting as 8cx + 7 = 20x − 35, no solution requires 8c = 20 (matching coefficients with an unequal constant), so c = 5/2.",
  },
  {
    type: "multiple_choice",
    topic: "Functions",
    difficulty: "medium",
    stem: "The function f is defined by f(x) = 3x − 7. If f(a) + 1 = 2a, what is the value of a?",
    choices: [
      { label: "A", body: "−1" },
      { label: "B", body: "1" },
      { label: "C", body: "5" },
      { label: "D", body: "6" },
    ],
    correctLabel: "D",
    explanation: "f(a) + 1 = (3a − 7) + 1 = 3a − 6. Setting 3a − 6 = 2a gives a = 6.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential growth — modeling",
    difficulty: "hard",
    stem: "A certain investment account offers a special interest rate for the first 4 months the account is open, followed by a lower interest rate for the remainder of the time the account is open. Bennett opened one of these accounts with an original balance of $700 and made no other deposits or withdrawals. Four months after opening the account, the balance had increased by 0.6% of the original balance. Six months after opening the account, the balance had increased by an additional 0.2% of the balance at the end of the first 4 months. Every 2 months after the first 6 months, the balance increased by an additional 0.2% of the balance 2 months before. Which of the following equations could represent the account balance B(x), in dollars, x months after the account was opened, where x ≥ 4?",
    choices: [
      { label: "A", body: "B(x) = 704.20 · 1.002^((x − 4)/2)" },
      { label: "B", body: "B(x) = 704.20 · 1.002^(x/2 − 4)" },
      { label: "C", body: "B(x) = 704.20 · 1.002^(2x − 8)" },
      { label: "D", body: "B(x) = 704.20 · 1.002^(2x − 4)" },
    ],
    correctLabel: "A",
    explanation: "After 4 months the balance is 700 × 1.006 = 704.20, and it grows by a factor of 1.002 for every 2-month period after month 4 — that is, (x − 4)/2 periods.",
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
    type: "multiple_choice",
    topic: "Quadratic equations",
    difficulty: "hard",
    stem: "4x² − px + w = −85\n\nIn the given equation, p and w are integer constants. The equation has exactly one real solution. Which is NOT a possible value of w?",
    choices: [
      { label: "A", body: "−21" },
      { label: "B", body: "15" },
      { label: "C", body: "64" },
      { label: "D", body: "315" },
    ],
    correctLabel: "C",
    explanation: "A single real solution requires p² = 16(w + 85), so w + 85 must be a perfect square; w = 64 gives 149, which is not a perfect square.",
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
      title: "2026 March Practice Test II",
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
