import { db } from "@/db";
import {
  practiceTests,
  testModules,
  questions,
  choices,
  moduleQuestions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const TEST_SLUG = "2026-may-practice-test";

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
      "The Apollo Moon landings (1969-1972) left charged particle detectors and equipment too heavy for liftoff on the Moon and produced large amounts of data. Researcher Philip Metzger, who is investigating the long-term effects of being on the Moon, continues to use Apollo's data, demonstrating that the missions' value to science ______.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "persists" },
      { label: "B", body: "responds" },
      { label: "C", body: "arrives" },
      { label: "D", body: "agrees" },
    ],
    correctLabel: "A",
    explanation: "The data still being useful decades later shows the missions' scientific value continues, i.e. persists.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "easy",
    stimulus:
      "The following text is from Billie Jean King's 2021 autobiography All In.\n\nPeople on both sides of my family had repeatedly demonstrated an independent streak. In the end, that was the temperament I gravitated toward, too. Both the Moffitts and the members of my mother's clan, the Jermans, came from mining and oil-geyser towns on the western frontier. They kept their heads down and worked, worked, worked. But they also bucked convention.",
    stem: 'As used in the text, what does the word "demonstrated" most nearly mean?',
    choices: [
      { label: "A", body: "Protested" },
      { label: "B", body: "Defined" },
      { label: "C", body: "Exhibited" },
      { label: "D", body: "Confirmed" },
    ],
    correctLabel: "C",
    explanation: '"Demonstrated an independent streak" means the family repeatedly showed, or exhibited, that trait.',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Scientists studying marine ecosystems were surprised by the extent of internal carbon recycling by red coralline algae. While some ______ of carbon was expected, the scientists found that the algae reabsorb nearly 40% of the carbon dioxide they produce during calcification processes and harness it for photosynthesis.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "reuse" },
      { label: "B", body: "imitation" },
      { label: "C", body: "supply" },
      { label: "D", body: "examination" },
    ],
    correctLabel: "A",
    explanation: "Reabsorbing carbon dioxide to harness for photosynthesis is a form of reuse.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The traditional Puerto Rican dish mofongo, characterized broadly by its base of mashed plantains, is often ______ in its preparation and serving style. Coastal families typically serve it with fresh-caught octopus and shrimp, mountain families tend to prepare it with chicharrones, and restaurant chefs in San Juan explore innovations like topping the dish with guarapo (juice from sugarcane).",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "seasonal" },
      { label: "B", body: "proprietary" },
      { label: "C", body: "meticulous" },
      { label: "D", body: "localized" },
    ],
    correctLabel: "D",
    explanation: "Different regions and settings prepare mofongo differently, so its preparation is localized.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The following text is from Charles Chesnutt's 1905 novel The Colonel's Dream. Mr. French and Mr. Kirby work together.\n\nMr. French, the senior partner, who sat opposite Kirby, was an older man —a safe guess would have placed him somewhere in the debatable ground between forty and fifty; of a good height, as could be seen even from the seated figure, the upper part of which was held erect with the unconscious ease which one associates with military training.",
    stem: 'As used in the text, what does the word "good" most nearly mean?',
    choices: [
      { label: "A", body: "Reliable" },
      { label: "B", body: "Courteous" },
      { label: "C", body: "Considerable" },
      { label: "D", body: "Capable" },
    ],
    correctLabel: "C",
    explanation: '"Of a good height" describes a considerable, notable height, not reliability or capability.',
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "easy",
    stimulus:
      "The Uffington White Horse in England is a large chalk image of a horse made by ancient peoples. Monuments like these were an inspiration for the land art movement that began in the 1960s. Land art artists create works set in the outdoors. For example, in her 1976 work Sun Tunnels, Nancy Holt placed four tubes made of concrete in a Utah desert to form an X and frame the sun.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      { label: "A", body: "The text argues against placing works of art outside." },
      { label: "B", body: "The text provides information about the land art movement." },
      { label: "C", body: "The text describes the popularity of art galleries in the 1960s." },
      { label: "D", body: "The text describes the benefits of being an artist." },
    ],
    correctLabel: "B",
    explanation: "The whole text explains what land art is, its origins, and an example, so it informs readers about the movement.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "Though Chloe Zhao's films are fictional, she incorporates real events into them in a documentary-like style and casts nonprofessional actors who reside in the places that she aims to portray. She also encourages these actors, whether they are teenagers living on the Pine Ridge Indian Reservation or adults who travel the country for work, to put as much of themselves into their roles as possible. Her approach adds powerful resonance to films that explore the highly personal experiences of place and home, and often the difficult decision to stay or leave.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      { label: "A", body: "To discuss how Chloe Zhao's background in documentary filmmaking has influenced her storytelling style in films" },
      { label: "B", body: "To emphasize that Chloe Zhao's decisions during the filmmaking process reinforce the themes of her films" },
      { label: "C", body: "To summarize how Chloe Zhao's style of filmmaking changed over the course of her career" },
      { label: "D", body: "To argue that Chloe Zhao's films are best understood as documentaries" },
    ],
    correctLabel: "B",
    explanation: "The text links Zhao's casting and directing choices directly to the films' themes of place and home, showing how her methods reinforce those themes.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "hard",
    stimulus:
      "While many initiatives aimed at limiting atmospheric warming focus on curbing emissions of methane (CH4), a greenhouse gas that is typically generated by microbially mediated processes, Lisa Y. Stein and Mary E. Lidstrom caution that under certain circumstances, such efforts cause microbial communities to accelerate production of nitrous oxide (N2O), another potent greenhouse gas, thus offsetting the impact of CH4 reduction. Researchers, therefore, need to take such biological interactions into account to ensure that any CH4 mitigation strategy has an overall positive climate effect.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      { label: "A", body: "It mentions a phenomenon that negatively affects the environment, summarizes competing methods for remedying that phenomenon, and then concedes that even apparently distinct methods share similar problems." },
      { label: "B", body: "It describes a widely accepted approach to addressing an environmental issue caused by a type of chemical emissions, indicates a potential disadvantage of that approach, and then discusses an implication of that disadvantage." },
      { label: "C", body: "It reports on a predicament resulting from emissions of a particular greenhouse gas, outlines a strategy aimed at solving that predicament, and then admonishes those who utilize that strategy without fully comprehending its ramifications." },
      { label: "D", body: "It presents an ongoing environmental challenge, demonstrates why the impact of that challenge may intensify over time, and then criticizes a misguidedly narrow attempt to address that impact." },
    ],
    correctLabel: "B",
    explanation: "The text describes the common CH4-focused approach, flags the N2O side effect as a disadvantage, and closes with the implication (accounting for biological interactions).",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "easy",
    stimulus:
      "A debut novel is the first book that an author has published. An example of a debut novel is The Skin I'm In by Sharon G. Flake. It was published in 1998. Debut novels are especially interesting to literary critics and readers because these books offer a look at new voices in the literary world.",
    stem: "Which choice best states the main topic of the text?",
    choices: [
      { label: "A", body: "The benefits of reading" },
      { label: "B", body: "Famous literary critics" },
      { label: "C", body: "Debut novels" },
      { label: "D", body: "Careers in the publishing industry" },
    ],
    correctLabel: "C",
    explanation: "The entire passage defines and discusses debut novels, making that the main topic.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "easy",
    stimulus:
      "Brown Bears in Katmai National Park, Alaska\nBear identification number | Sex | Age (years) | Approximate weight (pounds)\n173 | female | 10 | 400\n122 | male | 3 | 200\n117 | female | 6 | 325\n103 | male | 4 | 275\n\nScientists collected information about brown bears in Katmai National Park in Alaska. This information included each bear's sex, age, and approximate weight. For the bear with identification number 122, for example, the scientists recorded that the bear was ______.",
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      { label: "A", body: "male, 4 years old, and weighed approximately 275 pounds." },
      { label: "B", body: "female, 10 years old, and weighed approximately 400 pounds." },
      { label: "C", body: "male, 3 years old, and weighed approximately 200 pounds." },
      { label: "D", body: "female, 6 years old, and weighed approximately 325 pounds." },
    ],
    correctLabel: "C",
    explanation: "The table lists bear 122 as male, 3 years old, weighing approximately 200 pounds.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Great Expectations is an 1861 novel by Charles Dickens. The narrator describes his uncle, Joe Gargery, as being both powerful and tender: ______",
    stem: "Which quotation from Great Expectations most effectively illustrates the claim?",
    choices: [
      { label: "A", body: '"There I stood, for minutes, looking at Joe, already at work with a glow of health and strength upon his face that made it show as if the bright sun of the life in store for him were shining on it."' },
      { label: "B", body: '"In his working-clothes, Joe was a well-knit characteristic-looking blacksmith; in his holiday clothes, he was more like a scarecrow in good circumstances, than anything else."' },
      { label: "C", body: '"I have often thought [Joe] since, like the steam-hammer that can crush a man or pat an egg-shell, in his combination of strength with gentleness."' },
      { label: "D", body: '"Estella opened the gate as usual, and, the moment she appeared, Joe took his hat off and stood weighing it by the brim in both his hands."' },
    ],
    correctLabel: "C",
    explanation: "Only this quotation directly names both traits — strength and gentleness — via the steam-hammer image.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "medium",
    stimulus:
      "Fish Population in a Taiwanese Tide Pool, January 2001 to October 2001 (line graph tracking three species — combtooth blenny, barred flagtail, and striated rockskipper — across January, April, July, and October 2001).\n\nLin-Tai Ho and colleagues counted fish in a tide pool in Taiwan at several times during the year and found that some species had a significantly higher maximum population count than others. For example, the highest count for the combtooth blenny was 62 individuals in January of 2001, whereas the highest count for the striated rockskipper was ______",
    stem: "Which choice most effectively uses data from the graph to complete the example?",
    choices: [
      { label: "A", body: "16 individuals in October of 2001." },
      { label: "B", body: "15 individuals in July of 2001." },
      { label: "C", body: "72 individuals in January of 2001." },
      { label: "D", body: "5 individuals in July of 2001." },
    ],
    correctLabel: "D",
    explanation: "The graph shows the striated rockskipper's line peaking at 5 individuals, reached in July 2001.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      "In the early 1970s, art historian Michael Baxandall created an approach to viewing art called the \"period eye,\" which explains how to look at art through the lens of its historical period. Baxandall argued that it is critical that art historians understand and communicate the original social and cultural contexts of older works of art so that it is clear what the artists intended and how the pieces would have been understood by their original viewers. Since it was first introduced, Baxandall's period eye has significantly influenced the practice of art history.",
    stem: 'Which statement, if true, would most strongly support the claim in the underlined sentence? (The underlined portion reads: "Since it was first introduced, Baxandall\'s period eye has significantly influenced the practice of art history.")',
    choices: [
      { label: "A", body: "Many art historians working before the 1970s produced detailed analyses of the social and cultural contexts of older artworks, though few extended that approach to artworks produced in their own lifetimes." },
      { label: "B", body: "Art historians working today have largely rejected the idea, common among Baxandall's predecessors, that artists' intentions should influence how artworks are interpreted." },
      { label: "C", body: "For some historical periods, it is difficult for art historians to reconstruct how the original viewers of artworks understood what artists' intentions for their works were." },
      { label: "D", body: "Numerous art historians of the late twentieth century and twenty-first century have focused their scholarship on how various artworks were interpreted at the time of their creation." },
    ],
    correctLabel: "D",
    explanation: "Widespread later scholarship adopting Baxandall's contextual approach is direct evidence of his lasting influence on the field.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "Last-mile delivery refers to the final step in delivering packages to customers — and this final step can be very difficult. Delivery companies are contending with the increasing popularity of next-day delivery and with complex and inefficient delivery routes, resulting in a growing bottleneck of packages in the last-mile delivery stage. These companies have been experimenting with innovative solutions in last-mile delivery, including autonomous delivery robots (robots that deliver parcels from a van). Unfortunately, many of these innovations create new obstacles (e.g., robots travel relatively slowly since they must navigate many ground-level obstacles) and are not ready for full-scale implementation. As a result, delivery companies will likely ______.",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "encourage consumers to expect next-day delivery only for products that are widely available." },
      { label: "B", body: "be able to meet consumer's expectations for next-day delivery in many areas but not in all regions." },
      { label: "C", body: "have little incentive to find a solution to last-mile delivery challenges." },
      { label: "D", body: "continue to struggle with last-mile delivery operations until viable solutions become available." },
    ],
    correctLabel: "D",
    explanation: "Since current innovations create new obstacles and aren't ready for full-scale use, the bottleneck will likely persist until better solutions emerge.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "The olona shrub is one of many forest plant species native to Oahu (a Hawaiian island) that are at risk of extinction in the wild. Ecologists say that fruit-eating birds help support these species' population numbers by dropping seeds from the plants' fruits to different spots where new plants can grow. The birds native to Oahu that used to do this have all gone extinct over time. However, the common waxbill and other fruit-eating bird species brought to the island in the last 150 years have been found to spread plant seeds. Based on this finding, some ecologists suggest that olona shrubs and other forest plants native to Oahu ______.",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "probably established themselves on the island at about the same time as common waxbills and other fruit-eating birds did." },
      { label: "B", body: "may now depend on non-native birds, such as the common waxbill, to help maintain and increase their populations on the island." },
      { label: "C", body: "were likely already close to extinction long before non-native birds arrived on the island." },
      { label: "D", body: "seem to produce fewer fruits per plant now than they did when fruit-eating birds native to the island were still present." },
    ],
    correctLabel: "B",
    explanation: "With native seed-dispersing birds extinct, the introduced birds that now spread seeds have likely become the plants' new means of support.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Established in 1935 for the specific purpose of promoting collective bargaining between US labor unions and employers, ______ helped the nation recover from the Great Depression.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "the US government's many ways, just one of which was the National Labor Relations Act (NLRA)," },
      { label: "B", body: "the National Labor Relations Act (NLRA) was just one of many ways the US government" },
      { label: "C", body: "many ways, just one of which was the National Labor Relations Act (NLRA), were how the US government" },
      { label: "D", body: "the US government in many ways, just one of which was the National Labor Relations Act (NLRA)," },
    ],
    correctLabel: "B",
    explanation: 'The introductory modifier "Established in 1935..." must modify the subject that follows, which needs to be the National Labor Relations Act (NLRA) itself.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "In their 2019 study of butterfly diversity at Rupa Lake in Nepal, researcher Hari Adhikari and his colleagues counted eight Paris peacock ______ to the Papilionidae family, the Paris peacock (Papilio paris) is known to be rare.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "butterflies, belonging" },
      { label: "B", body: "butterflies. Belonging" },
      { label: "C", body: "butterflies and belonging" },
      { label: "D", body: "butterflies belonging" },
    ],
    correctLabel: "B",
    explanation: "Two independent clauses must be separated with end punctuation (a period), followed by a capitalized participial phrase.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      'How a folktale begins depends largely on the language in which it ______ folktales told in the Pashto language open with a phrase that roughly means "there was this work that." English-language folktales, on the other hand, often begin with "once upon a time."',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "originates. Many" },
      { label: "B", body: "originates, many" },
      { label: "C", body: "originates many" },
      { label: "D", body: "originates many," },
    ],
    correctLabel: "A",
    explanation: "Two independent clauses need end punctuation (a period) between them, followed by a capitalized new sentence.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Maize was among the many plant species from the Western Hemisphere introduced into the Eastern Hemisphere in the years following Christopher Columbus's first transatlantic voyage in 1492. This ongoing transfer of species between hemispheres ______ now known as the Columbian Exchange.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "were" },
      { label: "B", body: "being" },
      { label: "C", body: "is" },
      { label: "D", body: "are" },
    ],
    correctLabel: "C",
    explanation: 'The singular subject "this ongoing transfer" requires the singular present-tense verb "is."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      'Now seen as a mechanical precursor to the e-reader, Spanish educator and inventor Ángela Ruiz Robles\'s Enciclopedia Mecánica eschewed pages in favor of three horizontal paper scrolls that could be easily swapped out to accommodate a range of subjects. Though Ruiz Robles\'s prototype had limited functionality, interactive features described in her 1949 patent — such as a button labeled "verb" that would illuminate relevant text when pressed — ______ an impressive early vision of hypertext.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "revealing" },
      { label: "B", body: "has revealed" },
      { label: "C", body: "reveals" },
      { label: "D", body: "reveal" },
    ],
    correctLabel: "D",
    explanation: 'The plural subject "interactive features" requires the plural present-tense verb "reveal."',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "In the seventeenth century, market-savvy British greenhouses scrambled to cultivate ______ the small group of wealthy consumers who could afford to import them from the Caribbean, the fruits had become a status symbol.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "pineapples for" },
      { label: "B", body: "pineapples, which for" },
      { label: "C", body: "pineapples, for" },
      { label: "D", body: "pineapples. For" },
    ],
    correctLabel: "D",
    explanation: "Two independent clauses need to be separated with end punctuation (a period), followed by a capitalized transition word.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "It's tempting to think that the comic strips Jump Start and Wee Pals have the same main purpose — to amuse — because both feature humorous situations. ______ Wee Pals focuses just as much on challenging readers with sociopolitical commentary as it does on making them laugh.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Likewise," },
      { label: "B", body: "Next," },
      { label: "C", body: "In reality," },
      { label: "D", body: "In other words," },
    ],
    correctLabel: "C",
    explanation: "The second sentence corrects the assumption raised in the first, matching a contrastive transition like \"In reality.\"",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      'Karel Capek\'s 1920 play R.U.R. (Rossum\'s Universal Robots), in which artificial workers overthrow their masters, left an indelible mark on the science fiction genre, and the English language, by introducing the term "robot" (derived from the Czech word robota, meaning "indentured labor" or "drudgery"). ______ Capek\'s play also contributed to a venerable literary and mythological tradition: using artificial beings as mirrors and foils for humanity.',
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Despite its creation of such an iconic trope," },
      { label: "B", body: "By achieving such a lofty goal," },
      { label: "C", body: "Ultimately limited in its lasting influence," },
      { label: "D", body: "Beyond the simple coining of a term," },
    ],
    correctLabel: "D",
    explanation: "The sentence adds a second contribution beyond coining the word \"robot,\" matching \"Beyond the simple coining of a term.\"",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The Expedition of Humphry Clinker (1771) is an epistolary novel by English author Tobias Smollett.\n• Epistolary novels are novels written primarily as a series of fictional documents.\n• These documents can be letters, journal entries, newspaper clippings, and more.\n• The Expedition of Humphry Clinker consists primarily of letters.\n• The letters are sent between four family members, their maid, and a young man.\n\nThe student wants to define the term \"epistolary novel.\"",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Tobias Smollett's novel The Expedition of Humphry Clinker was published in 1771 and consists primarily of letters sent between four family members, their maid, and a young man." },
      { label: "B", body: "Consisting primarily of letters sent between four family members, their maid, and a young man, Tobias Smollett's The Expedition of Humphry Clinker is an epistolary novel." },
      { label: "C", body: "Published in 1771, The Expedition of Humphry Clinker is an epistolary novel by English author Tobias Smollett." },
      { label: "D", body: "An epistolary novel is a novel written primarily as a series of fictional documents, such as letters, journal entries, or newspaper clippings." },
    ],
    correctLabel: "D",
    explanation: "Only this choice states the general definition of \"epistolary novel\" rather than details about one specific example.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "medium",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The capital of Jamaica is Kingston.\n• The largest city in Jamaica by population is Kingston.\n• The capital of Morocco is Rabat.\n• The largest city in Morocco by population is Casablanca.\n\nThe student wants to make a generalization about capital cities.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "Casablanca and Rabat are both cities in Morocco." },
      { label: "B", body: "A country's capital city is not always the country's most populous city." },
      { label: "C", body: "Rabat, not Casablanca, is the capital of Morocco." },
      { label: "D", body: "The capital of Morocco is Rabat, while the capital of Jamaica is Kingston." },
    ],
    correctLabel: "B",
    explanation: "Only this choice draws a general conclusion (capitals aren't always the most populous city), supported by contrasting Jamaica and Morocco.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "easy",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• The A.M. Turing Award is a prestigious award given by the Association for Computing Machinery (ACM).\n• The ACM gives the award for \"major contributions of lasting importance to computing.\"\n• It is named after groundbreaking British mathematician Alan Turing.\n• Edgar F. Codd won the award in 1981.\n\nThe student wants to explain whom the award is named for and identify one recipient of it.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "The A.M. Turing Award, which is named for British mathematician Alan Turing, was given to Edgar F. Codd in 1981." },
      { label: "B", body: "In 1981, Edgar F. Codd won the A.M. Turing Award, which is given for \"major contributions of lasting importance to computing.\"" },
      { label: "C", body: "The A.M. Turing Award is given for \"major contributions of lasting importance to computing.\"" },
      { label: "D", body: "It was in 1981 that Edgar F. Codd won the A.M. Turing Award." },
    ],
    correctLabel: "A",
    explanation: "Only this choice both names Alan Turing as the award's namesake and identifies Edgar F. Codd as a recipient.",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "hard",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Albert Einstein's theory of general relativity allows for potential shortcuts through spacetime.\n• These hypothetical spacetime tunnels are known as wormholes.\n• For matter to travel through a wormhole, it would need to have negative energy density.\n• Negative energy density means that the matter would have less energy than empty space.\n• Such matter has not been shown to exist.\n\nThe student wants to acknowledge a complication affecting travel through wormholes.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "The hypothetical tunnels known as wormholes would be potential shortcuts through spacetime were it not for one complication: they have less energy than empty space." },
      { label: "B", body: "Einstein's theory of general relativity allows for potential spacetime shortcuts called wormholes but does not explain how matter with negative energy density could travel through them." },
      { label: "C", body: "For matter to travel through a wormhole, the matter would need to have less energy than empty space; such matter has not been shown to exist." },
      { label: "D", body: "For wormholes to be possible, according to Einstein's theory of general relativity, they would have to allow for potential shortcuts through spacetime." },
    ],
    correctLabel: "C",
    explanation: "Only this choice names the required negative-energy-density matter and directly notes the complication that such matter has never been observed.",
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
      "Recitals by Catherine Kautsky, known for her virtuosity on the piano, are rightly described as ______ given that they can feature not just the performance of a musical piece but also a lecture on the piece's composer and a slideshow contextualizing the time in which it was composed.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "circumscribed" },
      { label: "B", body: "multifaceted" },
      { label: "C", body: "undiscerning" },
      { label: "D", body: "exuberant" },
    ],
    correctLabel: "B",
    explanation: "Combining performance, lecture, and slideshow describes recitals with many facets — multifaceted.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Among saltwater fish species, there is a clear association between habitat latitude and morphological variety. While tropical species are ______ deep-bodied physical forms (body shapes that are laterally compressed but vertically extended), polar and temperate species are highly dispersed across the morphological spectrum.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "habituated to" },
      { label: "B", body: "authenticated by" },
      { label: "C", body: "concentrated among" },
      { label: "D", body: "contemporary with" },
    ],
    correctLabel: "C",
    explanation: "Contrasted with being \"highly dispersed,\" tropical species being clustered around one body form matches \"concentrated among.\"",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The following text is adapted from Edith Wharton's 1911 novella Ethan Frome. The narrator has asked the woman he rents a room from about Ethan Frome, a town resident he encountered recently.\n\nHer mind was a store-house of innocuous anecdote and any question about her acquaintances brought forth a volume of detail; but on the subject of Ethan Frome I found her unexpectedly reticent. There was no hint of disapproval in her reserve; I merely felt in her an insurmountable reluctance to speak of him.",
    stem: 'As used in the text, what does the word "reserve" most nearly mean?',
    choices: [
      { label: "A", body: "Constraint" },
      { label: "B", body: "Modesty" },
      { label: "C", body: "Composure" },
      { label: "D", body: "Misgiving" },
    ],
    correctLabel: "A",
    explanation: 'Her "reluctance to speak of him" is a held-back, constrained way of talking, matching "constraint."',
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "The work of Tobias Gerstenberg et al. on tracking eye movements supports a theory that people envision ______ scenarios when making causal judgments: when subjects were asked to look at two colliding billiard balls and judge whether one caused or prevented the other's movement through a gate, their eyes looked at where the target ball would have gone if the ball that altered its path did not exist.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "analogical" },
      { label: "B", body: "counterfactual" },
      { label: "C", body: "retrospective" },
      { label: "D", body: "ambivalent" },
    ],
    correctLabel: "B",
    explanation: "Imagining what would have happened \"if the ball...did not exist\" is imagining a counterfactual scenario.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "On receiving good news, people's first instinct might be to immediately share it, but a recent experiment suggests that keeping it a secret can be psychologically beneficial. Study participants were randomly assigned to reflect on an experience in which they either shared good news or kept it to themselves. On average, those who kept good news secret reported feeling more energized by the experience than participants who shared did, perhaps, as the researchers suggest, because the choice to savor good news is usually a personal one and autonomous motivation is linked with feelings of vitality.",
    stem: 'Which choice best describes the function of the underlined portion in the text as a whole? (The underlined portion reads: "On receiving good news, people\'s first instinct might be to immediately share it,")',
    choices: [
      { label: "A", body: "It indicates a reason why skepticism about the conclusions of the psychological study mentioned in the text is likely warranted." },
      { label: "B", body: "It reports the main conclusion of a study into a social phenomenon whose methodology is critiqued in the text." },
      { label: "C", body: "It presents a scenario whose psychological impact was investigated in the study summarized in the text." },
      { label: "D", body: "It provides an observation about human behavior that was validated by the experiment summarized in the text." },
    ],
    correctLabel: "C",
    explanation: "The underlined instinct-to-share behavior is the exact scenario the study goes on to test.",
  },
  {
    type: "multiple_choice",
    topic: "Cross-Text Connections",
    difficulty: "hard",
    stimulus:
      "Text 1\nFor decades, ornithologists assumed that if they saw a singing winter wren—a bird species found in temperate North America—they must be observing a male trying to attract a mate or claim territory. As Peter J.B. Slater and Nigel I. Mann have emphasized, however, a similar assumption can't be made about birds in the tropics, where females sing as often as males do. Slater and Mann call for more research on this discrepancy between tropical and temperate female birdsong.\n\nText 2\nRecent evidence shows that a female winter wren is as capable of song as a male is. In fact, female birdsong is more common among temperate species than currently assumed, claim Evangeline Rose and colleagues. These female songbirds sing less frequently than males do, and in duller tones, making it \"easy for researchers to miss the quiet and hidden females and focus on the loud and colorful males,\" says Rose.",
    stem: "Based on the texts, how would Rose and colleagues (Text 2) most likely respond to the assertion by Slater and Mann (Text 1) about the different prevalence of female birdsong in temperate and tropical areas?",
    choices: [
      { label: "A", body: "They would concede that the geographic difference in prevalence is real but argue that the frequency with which male tropical birds sing has been overstated by previous researchers." },
      { label: "B", body: "They would caution that the seeming difference in prevalence may be an artifact of researchers' tendency to study birdsong among temperate species more frequently than among tropical species." },
      { label: "C", body: "They would raise the possibility that the difference in prevalence may be due to differences in the timing of the mating season among temperate and tropical bird species." },
      { label: "D", body: "They would argue that the apparent difference in prevalence may partly reflect a difference in the ease with which female birdsong and male birdsong can be detected." },
    ],
    correctLabel: "D",
    explanation: "Rose's point that quiet, duller female song is easy to miss suggests the apparent temperate/tropical gap may reflect detection difficulty, not a real absence of song.",
  },
  {
    type: "multiple_choice",
    topic: "Cross-Text Connections",
    difficulty: "hard",
    stimulus:
      "Text 1\nIn separate studies, Yanbo Xiao and colleagues and Xinhua He and colleagues examined whether plants transfer nutrients to one another using a common mycorrhizal network (CMN) — a lattice of fungal strands in the soil. Xiao and colleagues excluded all pathways other than the CMN by using barriers to keep the plants' root systems separate while allowing mycorrhizal strands through — a crucial step He and colleagues' study did not take.\n\nText 2\nXiao and colleagues took the necessary precaution of separating the plants' root systems (thereby excluding root-to-root transmission). However, any barrier used must allow the thread-like hyphae of a CMN to pass through, and this permeability would also allow liquids through. Thus, the researchers' experimental design cannot ensure that any nutrient transfer observed can be attributed to a CMN and not to some other pathway.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the characterization of Xiao and colleagues' study in Text 1?",
    choices: [
      { label: "A", body: "By arguing that the author of Text 1 has conflated the method used by Xiao and colleagues with that used by He and colleagues" },
      { label: "B", body: "By claiming that the author of Text 1 has misrepresented what Xiao and colleagues were trying to achieve with their experimental design" },
      { label: "C", body: "By asserting that the author of Text 1 has overstated the effectiveness of the method that Xiao and colleagues used" },
      { label: "D", body: "By pointing out that the author of Text 1 has overlooked studies that reported results that contradict those reported by Xiao and colleagues" },
    ],
    correctLabel: "C",
    explanation: "Text 2 grants Xiao's barrier precaution but shows it doesn't fully isolate the CMN pathway, i.e. Text 1 overstated how effective that method was.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Since 2012, a consortium of research institutions has released an annual report that ranks countries by their populations' well-being, which the authors of the report derive using data from a globally administered survey of respondents' self-assessed levels of happiness. However, some other scholars caution that this approach reflects a tendentious understanding of the relationship between these two metrics. For example, studies have revealed a tendency among people in some non-Western countries to regard individual happiness as less important to their well-being than other ideals (e.g., a sense of harmony or balance).",
    stem: "Based on the text, what is a potential weakness of the annual report issued by the consortium of research institutions?",
    choices: [
      { label: "A", body: "It may not adequately account for cultural variations in the value attached to a particular concept." },
      { label: "B", body: "It relies on survey responses from participants who may not be representative of their countries' cultural norms." },
      { label: "C", body: "It overlooks how philosophies regarding a particular concept have evolved over time." },
      { label: "D", body: "It includes survey data from a wide range of Western countries but only from a narrow set of non-Western countries." },
    ],
    correctLabel: "A",
    explanation: "The report equates well-being with self-assessed happiness, but happiness is valued differently across cultures — a cultural-variation weakness.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "medium",
    stimulus:
      "While no one doubts that politicians are influenced by a variety of incentives, it is generally agreed that they seek to support policies their constituents favor — after all, they risk losing office if they do not. Direct contact with constituents via such means as public events and emails from voters is a major source of politicians' beliefs about their constituents' views, but it is susceptible to a selection effect. There is little reason to presume that individuals with the time, resources, and strength of feeling to directly engage with their representatives are themselves broadly representative.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      { label: "A", body: "Politicians aim to advocate for their constituents' policy preferences, but politicians' understanding of those preferences may be skewed." },
      { label: "B", body: "People who are likely to contact their elected representatives do not tend to be representative of politicians' constituents generally." },
      { label: "C", body: "Direct contact with constituents shapes politicians' beliefs about policies their constituents favor, and they try to act in accordance with those beliefs." },
      { label: "D", body: "Although politicians have an incentive to act in accordance with their constituents' views, that is not the only incentive shaping their actions." },
    ],
    correctLabel: "A",
    explanation: "The text's main point is that politicians try to serve constituent preferences, but the selection effect in direct contact skews their understanding of those preferences.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Within higher education, studying philosophy requires that students be conversant with the field's foundational texts and historical figures. By contrast, doing philosophy within or beyond the academy demands the creative, self-directed application of acquired expertise to enduring questions about the nature of existence and knowledge. While both approaches engage with influential figures, those who do philosophy treat such figures as vital interlocutors who facilitate new insights rather than as ossified authorities who, though relevant to the present, primarily represent the discipline's past.",
    stem: "Which choice best describes the relationship between doing philosophy and studying philosophy?",
    choices: [
      { label: "A", body: "Doing philosophy represents a departure from the norms that govern scholarly inquiry, whereas studying philosophy requires conformation to these norms." },
      { label: "B", body: "Doing philosophy involves developing novel ideas through imagined dialogue with past philosophers based on knowledge of those philosophers' views acquired by studying philosophy." },
      { label: "C", body: "Doing philosophy helps students formulate concrete solutions to practical issues, whereas studying philosophy prioritizes engagement with historical arguments in the field." },
      { label: "D", body: "Doing philosophy requires students to challenge the ideas articulated by past philosophers, especially when these ideas are broadly accepted by other people studying philosophy." },
    ],
    correctLabel: "B",
    explanation: "Doing philosophy builds new insight by treating past thinkers as interlocutors, which relies on the historical knowledge gained by studying philosophy.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      "Researchers have identified over eighty gestures made by nonhuman great apes, such as clapping and rocking from side to side, that appear to convey information and that seem to be biologically inherited. Kirsty E. Graham and Catherine Hobaiter hypothesized that humans may be able to interpret great ape gestures, either through an evolutionary inheritance or as part of more general human cognitive abilities. The researchers tested this hypothesis by enlisting participants in an online game in which they had to correctly identify the meanings of ape gestures seen in videos. Though participants achieved some success, it is unclear whether they sometimes did so by making use of additional context provided by the images or sounds in the video recordings.",
    stem: "Which statement, if true, would most strongly support the underlined claim? (The underlined portion reads: \"Though participants achieved some success, it is unclear whether they sometimes did so by making use of additional context provided by the images or sounds in the video recordings.\")",
    choices: [
      { label: "A", body: "Participants correctly identified gestures at the same rate for videos in which the apes made sounds in addition to gestures and videos in which the apes were silent." },
      { label: "B", body: "When apes made mouth-touching gestures, which participants tended to correctly interpret as requests for food, the food was visible in the videos." },
      { label: "C", body: "Participants were more readily able to identify an ape gesture when it meant \"climb on my back\" than when it meant \"let's be friendly.\"" },
      { label: "D", body: "Participants correctly interpreted ape gestures more than 50 percent of the time, whereas they would have only identified gestures correctly 25 percent of the time if they had been guessing." },
    ],
    correctLabel: "B",
    explanation: "Visible food alongside a correctly interpreted food-request gesture shows participants may have used that extra visual context rather than the gesture alone.",
  },
  {
    type: "multiple_choice",
    topic: "Command of Evidence",
    difficulty: "hard",
    stimulus:
      "Researchers used anonymized location data from the US and Cote d'Ivoire to document people's daily patterns of mobility, using these results to test the efficacy of the researchers' predictive computer model. In each country, unidirectional cycles among two, three, or four locations were empirically the most common pattern types; the graph shows each of these pattern types as a proportion of all pattern instances found for that country (e.g., the measured value for CI 3 in the graph, 0.12, indicates that the three-location pattern constituted 12% of all pattern instances in the Cote d'Ivoire data). The researchers ran their model twice under different assumptions, concluding that emphasizing the salience of local population density over personal preferences generally yielded the best results. (Bar graph: 'Proportion of the Three Most Commonly Exhibited Mobility Patterns, in the US and Cote d'Ivoire,' comparing measured values against two model variants across US 2, US 3, US 4, CI 2, CI 3, and CI 4.)",
    stem: "Which choice most effectively uses data from the graph to illustrate the researchers' conclusion?",
    choices: [
      { label: "A", body: "Under the assumption that density is more salient than preferences, the US 2 and CI 2 proportions are approximately 0.65 and 0.85, respectively significantly higher than the values predicted under the other assumption and thus farther than those predictions from the measured values." },
      { label: "B", body: "Under the assumption that preferences are more salient than density, the US 2 and CI 2 proportions were predicted to be approximately 0.45 and 0.35, respectively, both below the measured values, whereas under the other assumption, the model overestimated the proportion for US 2 and overestimated that for CI 2." },
      { label: "C", body: "Under the assumption that preferences are more salient than density, the two-location patterns (US 2 and CI 2) were predicted to be most frequent in the data even though neither proportion was projected to exceed 0.5, well below the proportion predicted under the other assumption." },
      { label: "D", body: "Under the assumption that preferences are more salient than density, the US 2 and CI 2 proportions were predicted to be in the range of 0.3 to 0.5, placing them farther from the measured values than were those predicted under the other assumption." },
    ],
    correctLabel: "D",
    explanation: "The preferences-emphasis model predicts US 2/CI 2 proportions of roughly 0.3–0.5, further from the measured values than the density-emphasis model — consistent with density being the better-performing assumption.",
  },
  {
    type: "multiple_choice",
    topic: "Central Ideas and Details",
    difficulty: "hard",
    stimulus:
      "Across brown bears — omnivores with high dietary plasticity — there is wide variety in dietary mix, which may reflect genetics, local resource availability, or social learning. Evaluating these possibilities, Anne Hertelet et al. analyzed 30 years of data on trophic position for female brown bears. After separation, daughters occupied the same trophic positions as their mothers for two years, but the correlation disappeared by year five. These findings suggest that ______.",
    stem: "Which choice most logically completes the text?",
    choices: [
      { label: "A", body: "social learning and resource fluctuations may both play a role in dietary mix among females, at least temporarily, though genetic factors appear to make a significant contribution as well." },
      { label: "B", body: "female dietary mix is best understood as changeable and contingent on fluctuating environmental conditions rather than as the result of social learning or genetic factors." },
      { label: "C", body: "dietary mix among females may reflect a social learning effect that eventually diminishes, though environmental constraints cannot be ruled out as a contributing factor." },
      { label: "D", body: "growing dissimilarity between mothers and their daughters with regard to dietary mix may reflect changes in the resources available in maternal habitats, though social learning could also contribute to the trend." },
    ],
    correctLabel: "C",
    explanation: "The temporary two-year similarity that later fades points to a fading social-learning effect, without ruling out environmental influence.",
  },
  {
    type: "multiple_choice",
    topic: "Words in Context",
    difficulty: "medium",
    stimulus:
      "Recitals by Catherine Kautsky, known for her virtuosity on the piano, are rightly described as ______ given that they can feature not just the performance of a musical piece but also a lecture on the piece's composer and a slideshow contextualizing the time in which it was composed.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: [
      { label: "A", body: "circumscribed" },
      { label: "B", body: "multifaceted" },
      { label: "C", body: "undiscerning" },
      { label: "D", body: "exuberant" },
    ],
    correctLabel: "B",
    explanation: "Combining performance, lecture, and slideshow describes recitals with many facets — multifaceted.",
  },
  {
    type: "multiple_choice",
    topic: "Text Structure and Purpose",
    difficulty: "medium",
    stimulus:
      "On receiving good news, people's first instinct might be to immediately share it, but a recent experiment suggests that keeping it a secret can be psychologically beneficial. Study participants were randomly assigned to reflect on an experience in which they either shared good news or kept it to themselves. On average, those who kept good news secret reported feeling more energized by the experience than participants who shared did, perhaps, as the researchers suggest, because the choice to savor good news is usually a personal one and autonomous motivation is linked with feelings of vitality.",
    stem: 'Which choice best describes the function of the underlined portion in the text as a whole? (The underlined portion reads: "On receiving good news, people\'s first instinct might be to immediately share it,")',
    choices: [
      { label: "A", body: "It indicates a reason why skepticism about the conclusions of the psychological study mentioned in the text is likely warranted." },
      { label: "B", body: "It reports the main conclusion of a study into a social phenomenon whose methodology is critiqued in the text." },
      { label: "C", body: "It presents a scenario whose psychological impact was investigated in the study summarized in the text." },
      { label: "D", body: "It provides an observation about human behavior that was validated by the experiment summarized in the text." },
    ],
    correctLabel: "C",
    explanation: "The underlined instinct-to-share behavior is the exact scenario the study goes on to test.",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "A bias toward studying birds and mammals over fish was one of the many shortcomings researcher Sonia Llorente-Culebras and her team ______ analyzing nearly 400 biodiversity studies from around the globe.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "discovered. While" },
      { label: "B", body: "discovered, while" },
      { label: "C", body: "discovered while" },
      { label: "D", body: "discovered: while" },
    ],
    correctLabel: "C",
    explanation: '"While analyzing..." is a dependent participial phrase modifying the team, so no punctuation is needed before it.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      "Jane Austen's Northanger Abbey (1818) is considered a satire of another novel popular at the time: Ann Radcliffe's The Mysteries of Udolpho (1794), which Austen's heroine, Catherine Morland, is depicted reading. However, the similarity of the ______ experiences — the predicaments of both Catherine and Radcliffe's Emily St. Aubert result from men's greed — suggests that underlying the satire is a social critique.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "novel's protagonist's" },
      { label: "B", body: "novels' protagonists" },
      { label: "C", body: "novels' protagonists'" },
      { label: "D", body: "novel's protagonists'" },
    ],
    correctLabel: "C",
    explanation: "Two novels (plural possessive) each have a protagonist (plural, and possessive since the experiences belong to them), giving \"novels' protagonists'.\"",
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "As part of his effort to identify Bronze Age pathways across Sicily, archaeologist Dario Calderone created three-dimensional digital models of the terrain via aerial photogrammetry. The drone ______ the landscape, which included archaeological sites from as far back as the Early Neolithic Period, flew in a pattern that ensured 60 percent forward overlap and 20 percent side overlap between individual images.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "photographs" },
      { label: "B", body: "photographing" },
      { label: "C", body: "was photographing" },
      { label: "D", body: "photographed" },
    ],
    correctLabel: "B",
    explanation: '"Photographing the landscape..." forms a participial phrase modifying "the drone," leaving "flew" as the sentence\'s finite main verb.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "medium",
    stimulus:
      "Before the ratification of the 19th Amendment in 1920, many US territories extended voting rights to women, in part to spur westward migration that would help these territories meet population thresholds for statehood. The Territory of Wyoming approved women's suffrage in 1869 before attaining statehood in ______ while eastern states, lacking the same incentive, did not follow suit until after the turn of the century.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "1890, for example," },
      { label: "B", body: "1890, for example:" },
      { label: "C", body: "1890, for example;" },
      { label: "D", body: "1890; for example," },
    ],
    correctLabel: "A",
    explanation: '"For example" is a parenthetical interrupter set off with commas, and it does not begin a new independent clause here.',
  },
  {
    type: "multiple_choice",
    topic: "Standard English Conventions",
    difficulty: "hard",
    stimulus:
      'In economics, soybeans are considered a commodity because they are essentially interchangeable, "essentially" being a word that admits a degree of latitude. In 2021, researchers J. Shorish, M. Stephenson, and M. Zargham devised a mathematical model of fungibility (interchangeability) that would account for such variation. Distinguishing "exactly the same" and "nearly the same" commodities — whether crops, lumber, or precious metals — ______ among their primary aims.',
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "was" },
      { label: "B", body: "were" },
      { label: "C", body: "having been" },
      { label: "D", body: "being" },
    ],
    correctLabel: "A",
    explanation: 'The gerund phrase "Distinguishing..." acts as a singular subject, requiring the singular past-tense verb "was."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "hard",
    stimulus:
      "The legacy of the Spanish Empire, which once controlled portions of five continents, is evident in Spanish-speaking Uruguay, one of many places that reveal their imperial history in their language. Contrast Uruguay with Belgium, which ceased to be part of the empire in ______ the latter's connection to the empire is so attenuated that Spanish is seldom spoken there today.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      { label: "A", body: "1714 and" },
      { label: "B", body: "1714" },
      { label: "C", body: "1714," },
      { label: "D", body: "1714;" },
    ],
    correctLabel: "D",
    explanation: "A semicolon correctly joins the two independent clauses — the empire's control ending in 1714 and the resulting attenuated connection.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "To determine the approximate age of sand engravings excavated from a coastal site in South Africa, archaeologist Charles Helm and colleagues collected samples of sediments surrounding the engravings; these samples were then analyzed using a method known as optically stimulated luminescence (OSL) dating. ______ OSL dating indicated that the engravings were between 129,000 and 149,000 years old.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Similarly," },
      { label: "B", body: "Ultimately," },
      { label: "C", body: "By comparison," },
      { label: "D", body: "In addition," },
    ],
    correctLabel: "B",
    explanation: "This sentence reports the eventual result of the dating process described just before it, so \"Ultimately\" fits.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "When it was built in the nineteenth century, the Eiffel Tower was criticized — even protested — for its unique appearance. ______ the spire-like structure earned not just acceptance but adoration, and its iconic design is now echoed in everything from the Eiffel Tower replica in Lake Buena Vista, Florida, to the Funkturm Berlin in Berlin, Germany.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "Ultimately," },
      { label: "B", body: "For example," },
      { label: "C", body: "Thus," },
      { label: "D", body: "Similarly," },
    ],
    correctLabel: "A",
    explanation: 'The sentence describes the eventual outcome after the earlier criticism, matching "Ultimately."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "Luminata Ilinca Ignat is a space scientist who works on the James Webb Space Telescope, or JWST. Thanks in part to Ilinca Ignat's contributions, the telescope is now positioned near the Sun-Earth L2 Lagrange point, almost one million miles beyond Earth's orbit. ______ the JWST's predecessor, the Hubble Telescope, is only about 340 miles above Earth's surface.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "By contrast," },
      { label: "B", body: "Secondly," },
      { label: "C", body: "Similarly," },
      { label: "D", body: "Therefore," },
    ],
    correctLabel: "A",
    explanation: "JWST's distant position is contrasted with Hubble's much closer orbit, so \"By contrast\" fits.",
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "In a given rock formation, Rhaetian rock from 208.5 million years ago might directly abut Lochkovian rock from 419.2 million years ago, with millions of years of material missing in between. ______ time did not stand still during these intervening years; the unaccounted-for sedimentary material was likely removed from the stratigraphic record via erosion and weathering.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "As a result," },
      { label: "B", body: "In particular," },
      { label: "C", body: "Of course," },
      { label: "D", body: "On the contrary," },
    ],
    correctLabel: "C",
    explanation: 'The sentence concedes an obvious point before explaining the missing material, matching "Of course."',
  },
  {
    type: "multiple_choice",
    topic: "Transitions",
    difficulty: "medium",
    stimulus:
      "The Sino-Tibetan language of Loke has only about 7,500 living speakers. Although most Loke speakers live in Nepal, where the language originated, Loke is also spoken in New York City. ______ the New York-based Endangered Language Alliance has identified a group of Loke speakers in the city's Allerton neighborhood, in the borough of the Bronx.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      { label: "A", body: "In addition," },
      { label: "B", body: "Nonetheless," },
      { label: "C", body: "Specifically," },
      { label: "D", body: "Meanwhile," },
    ],
    correctLabel: "C",
    explanation: "The sentence narrows the general claim (Loke is spoken in NYC) down to a specific neighborhood, matching \"Specifically.\"",
  },
  {
    type: "multiple_choice",
    topic: "Rhetorical Synthesis",
    difficulty: "hard",
    stimulus:
      "While researching a topic, a student has taken the following notes:\n• Shanawdithit (1801–1829) was a Beothuk cartographer (mapmaker).\n• Her maps of Newfoundland's Beothuk Lake outline both the lake and various points around the lake where encounters between the Indigenous Beothuk people and British colonists occurred.\n• Her maps are notable for depicting the experiences the Beothuk had within the landscape.\n• Contemporary Potawatomi cartographer Margaret Pearce: Indigenous cartography emphasizes \"experienced space, or place, as opposed to the Western convention of depicting space as universal, homogenized, and devoid of human experience.\"\n• Pearce: \"Indigenous cartographies are as diverse as Indigenous cultures, from Hawaiian performative cartographies to Navajo verbal maps and sand paintings.\"\n\nThe student wants to describe Shanawdithit's approach and explain its significance.",
    stem: "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      { label: "A", body: "By depicting experiences of the Beothuk that occurred around Beothuk Lake, Shanawdithit's maps reflect Indigenous cartography's emphasis on \"experienced space, or place\" rather than the landscape alone." },
      { label: "B", body: "According to Pearce, Indigenous cartography, such as Shanawdithit's maps of Beothuk Lake, emphasizes \"experienced space, or place,\" with a variety of approaches that reflect the diversity of Indigenous cultures." },
      { label: "C", body: "Shanawdithit mapped Beothuk Lake through significant encounters that occurred there, an approach that Pearce describes as \"depicting space as universal [and] homogenized.\"" },
      { label: "D", body: "Shanawdithit's maps are part of a broader tradition of Indigenous cartography that, according to Pearce, ranges from \"Hawaiian performative cartographies to Navajo verbal maps and sand paintings.\"" },
    ],
    correctLabel: "A",
    explanation: "Only this choice describes Shanawdithit's specific approach (depicting Beothuk experiences) and ties it to the significance Pearce identifies (\"experienced space, or place\").",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 1 (22 questions)
// ---------------------------------------------------------------------------

const MATH_MODULE_1: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Systems of equations — modeling",
    difficulty: "easy",
    stem: "An artist made 12 pieces of pottery using 42 pounds of clay. The pottery included only bowls and vases. Each bowl used 2 pounds of clay and each vase used 4 pounds of clay. How many vases did the artist make?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "5" },
      { label: "C", body: "7" },
      { label: "D", body: "9" },
    ],
    correctLabel: "D",
    explanation: "With b + v = 12 and 2b + 4v = 42, substituting b = 12 − v gives 24 + 2v = 42, so v = 9.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "easy",
    stem: "One gallon of paint will cover 10 square feet of a surface. A room has a total wall area of w square feet. Which equation represents the total amount of paint P, in gallons, needed to paint the walls of the room twice?",
    choices: [
      { label: "A", body: "P = 20w" },
      { label: "B", body: "P = 10w" },
      { label: "C", body: "P = w/5" },
      { label: "D", body: "P = w/10" },
    ],
    correctLabel: "C",
    explanation: "Painting twice covers 2w square feet total, and at 10 sq ft per gallon that requires 2w/10 = w/5 gallons.",
  },
  {
    type: "student_response",
    topic: "Quadratic equations",
    difficulty: "medium",
    stem: "x | y\n−4/3 | 0\n0 | −128\n4 | 0\n\nThe table shows three values of x and their corresponding values of y. There is a quadratic relationship between x and y. An equation that represents this relationship can be written as y = 24x² − bx − 128, where b is a constant. What is the value of b?",
    correctResponse: "64",
    explanation: "Substituting x = 4, y = 0: 24(16) − 4b − 128 = 0, so 384 − 4b − 128 = 0 and b = 64.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential models",
    difficulty: "easy",
    stem: "The equation E(t) = 5(1.2)^t gives the estimated number of employees at a certain business, where t is the number of years since the business opened. Which of the following is the best interpretation of the number 5 in this context?",
    choices: [
      { label: "A", body: "The increase in the estimated number of employees each year" },
      { label: "B", body: "The estimated number of employees when the business opened" },
      { label: "C", body: "The percent increase in the estimated number of employees each year" },
      { label: "D", body: "The number of years the business has been open" },
    ],
    correctLabel: "B",
    explanation: "At t = 0 (when the business opened), E(0) = 5, so 5 is the estimated starting number of employees.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "medium",
    stem: "Line t in the xy-plane has a slope of 1/7 and passes through the point (35, −8). Which equation defines line t?",
    choices: [
      { label: "A", body: "y = −13x + 1/7" },
      { label: "B", body: "y = x/7 − 13" },
      { label: "C", body: "y = x/7 − 8" },
      { label: "D", body: "y = 35x − 8" },
    ],
    correctLabel: "B",
    explanation: "Using y = x/7 + c with (35, −8): −8 = 5 + c, so c = −13, giving y = x/7 − 13.",
  },
  {
    type: "multiple_choice",
    topic: "Unit conversion",
    difficulty: "medium",
    stem: "The area of a rectangular region is increasing at a rate of 210 square feet per hour. Which of the following is closest to this rate in square meters per minute? (Use 1 meter = 3.28 feet.)",
    choices: [
      { label: "A", body: "0.33" },
      { label: "B", body: "1.07" },
      { label: "C", body: "11.48" },
      { label: "D", body: "19.52" },
    ],
    correctLabel: "A",
    explanation: "210 sq ft/hr × (1/3.28)² sq m per sq ft ÷ 60 min/hr ≈ 0.33 sq m/min.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / scatterplots",
    difficulty: "hard",
    stem: "The scatterplot shows the relationship between x and y for the 9 data points in data set A. A quadratic model for the data in data set A can be written as y = 0.04x² − 0.07x + 6.59. The graph of this model is shown in the xy-plane. The data point at x = 0 was found to be the result of a recording error and was removed from data set A to create data set B, consisting of the remaining 8 data points. A quadratic model for the data in data set B can be written as y = ax² + bx + c, where a, b, and c are constants. If the quadratic models for data sets A and B are calculated in the same way, which of the following statements must be true?\n\nI. a > 0.04\nII. c < 6.59",
    choices: [
      { label: "A", body: "I only" },
      { label: "B", body: "II only" },
      { label: "C", body: "I and II" },
      { label: "D", body: "Neither I nor II" },
    ],
    correctLabel: "C",
    explanation: "The removed point at x = 0 sat well above the fitted curve near its vertex; without it, the remaining points pull the curve's minimum down (lower c) and require sharper curvature to still fit the spread (larger a).",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic graphs",
    difficulty: "medium",
    stem: "f(x) = (2x − 7)(2x + 5)\n\nWhat is the minimum value of the given function?",
    choices: [
      { label: "A", body: "−36" },
      { label: "B", body: "−5/2" },
      { label: "C", body: "1/2" },
      { label: "D", body: "2" },
    ],
    correctLabel: "A",
    explanation: "Expanding gives f(x) = 4x² − 4x − 35, with vertex at x = 0.5, where f(0.5) = 1 − 2 − 35 = −36.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — circles",
    difficulty: "medium",
    stem: "2x² + 18x + 2y² + 12y = 15/2\n\nThe given equation defines a circle in the xy-plane. What is the radius of the circle?",
    choices: [
      { label: "A", body: "√30 / 2" },
      { label: "B", body: "√15" },
      { label: "C", body: "√33" },
      { label: "D", body: "√498 / 2" },
    ],
    correctLabel: "C",
    explanation: "Dividing by 2 and completing the square gives (x + 4.5)² + (y + 3)² = 33, so the radius is √33.",
  },
  {
    type: "student_response",
    topic: "Right triangles",
    difficulty: "easy",
    stem: "A right triangle has legs of 4 cm and 6 cm. What is the area of this triangle, in cm²?",
    correctResponse: "12",
    explanation: "Area = (1/2)(4)(6) = 12.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — angles",
    difficulty: "hard",
    stem: "In a figure, line AB is parallel to line CD, and line AD intersects line BC at point E, with y° and z° marked at B and D (outside segments AB and CD) and x° marked at E. If y = 119 and z = 113, what is the value of x?",
    choices: [
      { label: "A", body: "52" },
      { label: "B", body: "67" },
      { label: "C", body: "128" },
      { label: "D", body: "142" },
    ],
    correctLabel: "C",
    explanation: "The interior angles at B and D are 180 − 119 = 61° and 180 − 113 = 67°; x°, as the exterior angle of the triangle at E, equals their sum: 61 + 67 = 128.",
  },
  {
    type: "student_response",
    topic: "Percentages",
    difficulty: "hard",
    stem: "A researcher investigated two species of mites: a predator and its prey. At the start of a week, there was an equal number of the two species. At the end of the week, the number of prey had increased by 1900% of the number of prey at the start of the week, and the number of predators had increased by 240% of the number of predators at the start of the week. The number of predators at the end of the week was p% less than the number of prey at the end of the week. What is the value of p?",
    correctResponse: "83",
    explanation: "Predators end at 3.4× the start, prey end at 20× the start; (20 − 3.4)/20 × 100 = 83%.",
  },
  {
    type: "multiple_choice",
    topic: "Factoring",
    difficulty: "medium",
    stem: "Which expression is NOT a factor of 6,480x⁴ − 1,280?",
    choices: [
      { label: "A", body: "9x² + 4" },
      { label: "B", body: "3x² − 2" },
      { label: "C", body: "3x + 2" },
      { label: "D", body: "80" },
    ],
    correctLabel: "B",
    explanation: "6,480x⁴ − 1,280 = 80(9x² − 4)(9x² + 4) = 80(3x − 2)(3x + 2)(9x² + 4); 3x² − 2 is not among these factors.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "−4x + 24px = 72\n\nIn the given equation, p is a constant. The equation has no solution. What is the value of p?",
    choices: [
      { label: "A", body: "0" },
      { label: "B", body: "1/6" },
      { label: "C", body: "3/4" },
      { label: "D", body: "3" },
    ],
    correctLabel: "B",
    explanation: "No solution requires the x-coefficient to vanish: −4 + 24p = 0, so p = 1/6.",
  },
  {
    type: "multiple_choice",
    topic: "Data analysis / graphs",
    difficulty: "medium",
    stem: "A zoologist observed the nests of wood ducks in an area. Each year, the zoologist recorded the number of eggs in each of the first 35 nests that were observed and created a frequency table for the data set. Which of the following frequency tables represents the data set with the smallest standard deviation?\n\nA) 10:8, 11:7, 12:5, 13:7, 14:8\nB) 10:7, 11:7, 12:7, 13:7, 14:7\nC) 10:2, 11:8, 12:15, 13:8, 14:2\nD) 8:0, 9:5, 10:35, 11:5, 12:0",
    choices: [
      { label: "A", body: "10: 8, 11: 7, 12: 5, 13: 7, 14: 8" },
      { label: "B", body: "10: 7, 11: 7, 12: 7, 13: 7, 14: 7" },
      { label: "C", body: "10: 2, 11: 8, 12: 15, 13: 8, 14: 2" },
      { label: "D", body: "8: 0, 9: 5, 10: 35, 11: 5, 12: 0" },
    ],
    correctLabel: "D",
    explanation: "Table D concentrates almost all values at a single central number (10 eggs), giving it the least spread and smallest standard deviation.",
  },
  {
    type: "student_response",
    topic: "Quadratic equations",
    difficulty: "easy",
    stem: "(x + 2)(x − 12) = 0\n\nWhat is the positive solution to the given equation?",
    correctResponse: "12",
    explanation: "The solutions are x = −2 and x = 12; the positive one is 12.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic graphs",
    difficulty: "hard",
    stem: "The function f is a quadratic function. In the xy-plane, the graph of y = f(x) has a vertex at (1, 4) and passes through the points (2, 28) and (−1, 100). What is the value of f(−2) − f(0)?",
    choices: [
      { label: "A", body: "76" },
      { label: "B", body: "124" },
      { label: "C", body: "192" },
      { label: "D", body: "220" },
    ],
    correctLabel: "C",
    explanation: "With f(x) = a(x−1)² + 4 and f(2) = 28, a = 24; then f(−2) = 220 and f(0) = 28, so f(−2) − f(0) = 192.",
  },
  {
    type: "multiple_choice",
    topic: "Geometry — circles",
    difficulty: "medium",
    stem: "2x² + 14x + 2y² + 20y = 15/2\n\nThe given equation defines a circle in the xy-plane. What is the radius of the circle?",
    choices: [
      { label: "A", body: "√30 / 2" },
      { label: "B", body: "√15" },
      { label: "C", body: "√41" },
      { label: "D", body: "√626 / 2" },
    ],
    correctLabel: "C",
    explanation: "Dividing by 2 and completing the square gives (x + 3.5)² + (y + 5)² = 41, so the radius is √41.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "y = 6x² − 48x + 99\ny + 4 = 0\n\nHow many solutions are there to the given system of equations?",
    choices: [
      { label: "A", body: "There is exactly 1 solution." },
      { label: "B", body: "There are exactly 2 solutions." },
      { label: "C", body: "There are exactly 3 solutions." },
      { label: "D", body: "There are no solutions." },
    ],
    correctLabel: "D",
    explanation: "Setting 6x² − 48x + 99 = −4 gives 6x² − 48x + 103 = 0, whose discriminant (2304 − 2472 = −168) is negative, so there are no real solutions.",
  },
  {
    type: "multiple_choice",
    topic: "Triangle inequality",
    difficulty: "medium",
    stem: "A triangle has side lengths 3, 4, and 2x. Which of the following is NOT a possible value of x?",
    choices: [
      { label: "A", body: "1" },
      { label: "B", body: "2.5" },
      { label: "C", body: "3" },
      { label: "D", body: "5" },
    ],
    correctLabel: "D",
    explanation: "The triangle inequality requires 1 < 2x < 7; only x = 5 (2x = 10) falls outside that range.",
  },
  {
    type: "multiple_choice",
    topic: "Lines & slope",
    difficulty: "easy",
    stem: "Line p in the xy-plane contains the points (6, 0) and (6, 6). Which equation defines line p?",
    choices: [
      { label: "A", body: "x = 0" },
      { label: "B", body: "x = 6" },
      { label: "C", body: "y = 0" },
      { label: "D", body: "y = 6" },
    ],
    correctLabel: "B",
    explanation: "Both points share x = 6, so line p is the vertical line x = 6.",
  },
  {
    type: "multiple_choice",
    topic: "Functions",
    difficulty: "easy",
    stem: "The function f is defined by f(z) = 3z. Which of the following is equivalent to f(z − 7)?",
    choices: [
      { label: "A", body: "−3z" },
      { label: "B", body: "3z − 7" },
      { label: "C", body: "3z − 21" },
      { label: "D", body: "−3z + 21" },
    ],
    correctLabel: "C",
    explanation: "f(z − 7) = 3(z − 7) = 3z − 21.",
  },
];

// ---------------------------------------------------------------------------
// Math — Module 2 (22 questions)
// ---------------------------------------------------------------------------

const MATH_MODULE_2: QuestionInput[] = [
  {
    type: "multiple_choice",
    topic: "Rational equations",
    difficulty: "hard",
    stem: "The expression (kx − 17) / (2x² − 11x + 15) is equivalent to p/(x − 3) − 1/(2x − 5), where k and p are constants. What is the value of p?",
    choices: [
      { label: "A", body: "−16" },
      { label: "B", body: "14/5" },
      { label: "C", body: "4" },
      { label: "D", body: "7" },
    ],
    correctLabel: "C",
    explanation: "Combining the right side over (x−3)(2x−5) gives numerator (2p−1)x + (3−5p); matching the constant term −17 = 3 − 5p gives p = 4.",
  },
  {
    type: "multiple_choice",
    topic: "Angles — radians and degrees",
    difficulty: "easy",
    stem: "The measure of angle F is π/12 radians. If the measure of angle F is 3n degrees, where n is a constant, what is the value of n?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "5" },
      { label: "C", body: "12" },
      { label: "D", body: "15" },
    ],
    correctLabel: "B",
    explanation: "π/12 radians = (π/12)(180/π) = 15°; setting 3n = 15 gives n = 5.",
  },
  {
    type: "multiple_choice",
    topic: "Polynomial expressions",
    difficulty: "hard",
    stem: "The function g is defined by g(x) = −2x(x + 4)(x − k)² + r, where k and r are integer constants. In the xy-plane, the graph of y = g(x) passes through the point (8, 17), and g(0) = 17. What is the value of r + k?",
    choices: [
      { label: "A", body: "−8" },
      { label: "B", body: "0" },
      { label: "C", body: "17" },
      { label: "D", body: "25" },
    ],
    correctLabel: "D",
    explanation: "g(0) = r = 17; then g(8) = −2(8)(12)(8−k)² + 17 = 17 forces (8−k)² = 0, so k = 8, and r + k = 25.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential functions",
    difficulty: "medium",
    stem: "The function f is defined by f(x) = 41(0.26)^x. For any positive integer n, the value of f(n) is p% less than the value of f(n − 1). What is the value of p?",
    choices: [
      { label: "A", body: "74" },
      { label: "B", body: "59" },
      { label: "C", body: "41" },
      { label: "D", body: "26" },
    ],
    correctLabel: "A",
    explanation: "f(n)/f(n−1) = 0.26, a 74% decrease, so p = 74.",
  },
  {
    type: "multiple_choice",
    topic: "Inequalities",
    difficulty: "medium",
    stem: "The shaded region shown in the xy-plane (bounded by a dashed line through approximately (0, 4) and (2, 0), shaded to the upper right) represents the solutions to which inequality?",
    choices: [
      { label: "A", body: "y ≥ −2x + 4" },
      { label: "B", body: "y > 4x − 2" },
      { label: "C", body: "y ≤ −2x + 4" },
      { label: "D", body: "y ≤ 4x − 2" },
    ],
    correctLabel: "A",
    explanation: "The boundary line has slope −2 and y-intercept 4, and the shading above/right of it matches y ≥ −2x + 4.",
  },
  {
    type: "student_response",
    topic: "Exponential functions",
    difficulty: "medium",
    stem: "f(x) = 21(1.20)^(x/3)\n\nFor the given function f, the value of f(x) increases by p% for every increase of x by 6. What is the value of p?",
    correctResponse: "44",
    explanation: "An increase of x by 6 raises the exponent x/3 by 2, multiplying f(x) by 1.20² = 1.44 — a 44% increase.",
  },
  {
    type: "multiple_choice",
    topic: "Quadratic word problems",
    difficulty: "hard",
    stem: "A company developed a plan to set the selling price of a product. The company determined that for a selling price of $90.00, zero products would be sold. For each $1.50 decrease in the selling price, the number of products sold would increase by one. For a revenue of exactly $1,336.50, which of the following could be the number of products sold? (revenue = price × number of products sold)",
    choices: [
      { label: "A", body: "27" },
      { label: "B", body: "30" },
      { label: "C", body: "831" },
      { label: "D", body: "1,350" },
    ],
    correctLabel: "A",
    explanation: "With price = 90 − 1.5n, solving (90 − 1.5n)n = 1,336.50 gives n² − 60n + 891 = 0, so n = 27 or n = 33; only 27 is listed.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of equations",
    difficulty: "medium",
    stem: "y = 4x² − 24x + 38\ny + 3 = 0\n\nHow many solutions are there to the given system of equations?",
    choices: [
      { label: "A", body: "There is exactly 1 solution." },
      { label: "B", body: "There are exactly 2 solutions." },
      { label: "C", body: "There are exactly 3 solutions." },
      { label: "D", body: "There are no solutions." },
    ],
    correctLabel: "D",
    explanation: "Setting 4x² − 24x + 38 = −3 gives 4x² − 24x + 41 = 0, whose discriminant (576 − 656 = −80) is negative, so there are no real solutions.",
  },
  {
    type: "student_response",
    topic: "Quadratic equations",
    difficulty: "hard",
    stem: "−7x² + bx − 63 = 0\n\nIn the given equation, b is a positive integer. The equation has no real solution. What is the largest possible value of b?",
    correctResponse: "41",
    explanation: "No real solution requires b² − 4(−7)(−63) < 0, i.e. b² < 1,764; the largest integer satisfying this is b = 41.",
  },
  {
    type: "student_response",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "If 5 + 2(13 − x)/7 = 3(13 − x) + 5, what is the value of 13 + x?",
    correctResponse: "26",
    explanation: "Letting u = 13 − x, the equation simplifies to 2u/7 = 3u, forcing u = 0, so x = 13 and 13 + x = 26.",
  },
  {
    type: "multiple_choice",
    topic: "Area — rectangles",
    difficulty: "easy",
    stem: "The area of a rectangle is 60 square inches. The length of the longest side of the rectangle is 15 inches. What is the length, in inches, of the shortest side of this rectangle?",
    choices: [
      { label: "A", body: "4" },
      { label: "B", body: "15" },
      { label: "C", body: "30" },
      { label: "D", body: "45" },
    ],
    correctLabel: "A",
    explanation: "The shorter side equals 60 ÷ 15 = 4.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations — modeling",
    difficulty: "medium",
    stem: "For the linear function g, g(9) = 11 and g(x + 1) − g(x) = 2. Which equation defines g?",
    choices: [
      { label: "A", body: "g(x) = 9x + 2" },
      { label: "B", body: "g(x) = 9x + 11" },
      { label: "C", body: "g(x) = 2x − 18" },
      { label: "D", body: "g(x) = 2x − 7" },
    ],
    correctLabel: "D",
    explanation: "The slope is 2, and g(9) = 18 + b = 11 gives b = −7, so g(x) = 2x − 7.",
  },
  {
    type: "student_response",
    topic: "Linear equations",
    difficulty: "medium",
    stem: "x | f(x)\n−9 | 78\n9 | −156\n27 | −390\n\nFor the linear function f, the table shows three values of x and their corresponding values of f(x). Function f is defined by f(x) = rx + s, where r and s are constants. What is the value of rs?",
    correctResponse: "507",
    explanation: "The slope r = (−156 − 78)/(9 − (−9)) = −13; then s = 78 − (−13)(−9) = −39, so rs = (−13)(−39) = 507.",
  },
  {
    type: "student_response",
    topic: "Polynomial expressions",
    difficulty: "hard",
    stem: "57x¹⁸ + bx⁹ + 34\n\nThe given expression, where b is a constant, is equivalent to (3x⁹ + q)(rx⁹ + 2), where q and r are constants. What is the value of b?",
    correctResponse: "329",
    explanation: "Matching coefficients: 3r = 57 gives r = 19, and 2q = 34 gives q = 17; then b = 6 + qr = 6 + (17)(19) = 329.",
  },
  {
    type: "multiple_choice",
    topic: "Polynomial expressions",
    difficulty: "medium",
    stem: "g(x) = x³ + ax² + bx + c\n\nThe function g is defined by the given equation, where a, b, and c are integer constants. The zeros of the function are −2, −7, and 3. What is the value of a?",
    choices: [
      { label: "A", body: "−42" },
      { label: "B", body: "−6" },
      { label: "C", body: "6" },
      { label: "D", body: "42" },
    ],
    correctLabel: "C",
    explanation: "(x+2)(x+7)(x−3) expands to x³ + 6x² − 13x − 42, so a = 6.",
  },
  {
    type: "student_response",
    topic: "Geometry — circles",
    difficulty: "medium",
    stem: "A circle in the xy-plane has its center at (−4, 4) and has a radius of 6. An equation of this circle is x² + y² + ax + by + c = 0, where a, b, and c are constants. What is the value of c?",
    correctResponse: "-4",
    explanation: "(x+4)² + (y−4)² = 36 expands to x² + y² + 8x − 8y − 4 = 0, so c = −4.",
  },
  {
    type: "student_response",
    topic: "Linear equations — modeling",
    difficulty: "easy",
    stem: "A model estimates that the population of a state was 4 million in 1980 and increased by 0.041 million each year until 2007. According to the model, what was the estimated population of this state, in millions, 10 years after 1980?",
    correctResponse: "4.41",
    explanation: "4 + 0.041(10) = 4.41 million.",
  },
  {
    type: "student_response",
    topic: "Geometry — similarity",
    difficulty: "hard",
    stem: "In triangle RST, angle T is a right angle, point L lies on RS, point K lies on ST, and LK is parallel to RT. If the length of RT is 63 units, the length of LK is 21 units, and the area of triangle RST is 252 square units, what is the length of KT, in units?",
    correctResponse: "112/21",
    explanation: "Area = (1/2)(RT)(ST) = 252 gives ST = 8; since LK ∥ RT, SK/ST = LK/RT = 1/3, so KT = ST(2/3) = 16/3 = 112/21.",
  },
  {
    type: "multiple_choice",
    topic: "Percentages",
    difficulty: "medium",
    stem: "A car dealership has only sedans, SUVs, and minivans for sale. On Monday, 20% of the vehicles for sale were sedans and 50% were SUVs. If there were 62 sedans for sale at the dealership on Monday, how many minivans were for sale?",
    choices: [
      { label: "A", body: "93" },
      { label: "B", body: "310" },
      { label: "C", body: "9" },
      { label: "D", body: "36" },
    ],
    correctLabel: "A",
    explanation: "62 sedans is 20% of the total, so the total is 310; minivans = 310 − 62 − 155 (50% SUVs) = 93.",
  },
  {
    type: "multiple_choice",
    topic: "Exponential models",
    difficulty: "medium",
    stem: "An exponential function f gives the estimated amount of an X-ray beam's initial intensity remaining after passing through a w-centimeter-thick window made of beryllium. The function estimates that after passing through a 1.8-centimeter-thick window, the amount of the X-ray beam's initial intensity remaining is 0.65. Which equation could define f?",
    choices: [
      { label: "A", body: "f(w) = 0.65(0.79)^(w−1.8)" },
      { label: "B", body: "f(w) = 0.65(0.79)^(w/1.8)" },
      { label: "C", body: "f(w) = 0.65(1.8)^w" },
      { label: "D", body: "f(w) = 1.8(0.65)^w" },
    ],
    correctLabel: "A",
    explanation: "Only f(w) = 0.65(0.79)^(w−1.8) gives f(1.8) = 0.65 exactly, since the exponent becomes 0 at w = 1.8.",
  },
  {
    type: "multiple_choice",
    topic: "Trigonometry",
    difficulty: "hard",
    stem: "In a figure, triangle ADE has a right angle at D, with B on AD and C on AE such that BC is parallel to DE. If the length of DE is 162 and the length of AE is 270, what is the value of tan x°, where x° is the angle at C between CB and CE?",
    choices: [
      { label: "A", body: "270/162" },
      { label: "B", body: "216/162" },
      { label: "C", body: "162/270" },
      { label: "D", body: "162/216" },
    ],
    correctLabel: "B",
    explanation: "AD = √(270² − 162²) = 216; since BC ∥ DE, angle x° corresponds to angle AED, so tan x° = AD/DE = 216/162.",
  },
  {
    type: "multiple_choice",
    topic: "Absolute value equations",
    difficulty: "medium",
    stem: "The function f is defined by f(x) = |x − 6x|. What value of a satisfies f(1) − f(a) = −15?",
    choices: [
      { label: "A", body: "−16" },
      { label: "B", body: "3" },
      { label: "C", body: "4" },
      { label: "D", body: "75" },
    ],
    correctLabel: "C",
    explanation: "f(x) = 5|x|, so f(1) = 5; 5 − f(a) = −15 gives f(a) = 20, so |a| = 4, and a = 4 is the listed choice.",
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
      title: "2026 May Practice Test",
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
