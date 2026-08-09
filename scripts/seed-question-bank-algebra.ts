import { db } from "@/db";
import {
  practiceTests,
  testModules,
  questions,
  choices,
  moduleQuestions,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const TEST_SLUG = "question-bank-algebra";

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
// Math — Algebra domain, sourced from a College Board Question Bank export
// (605 items). Transcribed in batches; each batch appended below.
// ---------------------------------------------------------------------------

const ALGEBRA_QUESTIONS: QuestionInput[] = [
  {
    type: "student_response",
    topic: "Linear equations in one variable",
    difficulty: "hard",
    stem: "(12x + 28)/4 − s/13 = r(x − 8)\n\nIn the given equation, s and r are constants, and s > 0. If the equation has infinitely many solutions, what is the value of s?",
    correctResponse: "403",
    explanation:
      "Dividing (12x + 28) by 4 gives 3x + 7, so the equation becomes 3x + 7 − s/13 = r(x − 8) = rx − 8r. For infinitely many solutions, the coefficients of x must match, so r = 3, and the constant terms must match: 7 − s/13 = −8r = −24, so s/13 = 31, giving s = 403.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "In the xy-plane, line ℓ passes through the points (8, 0) and (3, 4), and line k passes through the points (8, 0) and (−2, 4). Which system of linear equations represents lines ℓ and k?",
    choices: [
      { label: "A", body: "8x + 4y = 32\n−10x − 4y = −64" },
      { label: "B", body: "8x − 4y = 32\n−10x + 4y = −64" },
      { label: "C", body: "4x − 10y = 32\n−8x + 10y = −64" },
      { label: "D", body: "4x + 10y = 32\n−8x − 10y = −64" },
    ],
    correctLabel: "D",
    explanation:
      "Line ℓ through (8, 0) and (3, 4) has slope (4 − 0)/(3 − 8) = −4/5, giving y = −4/5(x − 8), or 4x + 5y = 32, which matches −8x − 10y = −64 after multiplying by −2. Line k through (8, 0) and (−2, 4) has slope (4 − 0)/(−2 − 8) = −2/5, giving y = −2/5(x − 8), or 2x + 5y = 16, which matches 4x + 10y = 32 after multiplying by 2.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = 25x + 30. What is the value of f(x) when x = 2?",
    choices: [
      { label: "A", body: "50" },
      { label: "B", body: "57" },
      { label: "C", body: "80" },
      { label: "D", body: "110" },
    ],
    correctLabel: "C",
    explanation: "Substituting 2 for x gives f(2) = 25(2) + 30 = 50 + 30 = 80.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "medium",
    stem: "Line k is defined by y = −17/3 x + 5. Line j is perpendicular to line k in the xy-plane. What is the slope of line j?",
    correctResponse: "3/17",
    explanation:
      "The slope of a line perpendicular to another is the negative reciprocal of that line's slope. Line k has slope −17/3, so line j has slope 3/17.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "2(8x) + 4(7y) = 12\n−2(8x) + 4(7y) = 12\n\nThe solution to the given system of equations is (x, y). What is the value of 8x + 7y?",
    correctResponse: "3",
    explanation:
      "Adding the two equations eliminates the 8x terms: 8(7y) = 24, so 7y = 3. Substituting into the first equation gives 2(8x) + 4(3) = 12, so 8x = 0. Therefore 8x + 7y = 0 + 3 = 3.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "medium",
    stem: "A cargo helicopter delivers only 100-pound packages and 120-pound packages. For each delivery trip, the helicopter must carry at least 10 packages, and the total weight of the packages can be at most 1,100 pounds. What is the maximum number of 120-pound packages that the helicopter can carry per trip?",
    choices: [
      { label: "A", body: "2" },
      { label: "B", body: "4" },
      { label: "C", body: "5" },
      { label: "D", body: "6" },
    ],
    correctLabel: "C",
    explanation:
      "Let a be the number of 120-pound packages and b the number of 100-pound packages. Then 120a + 100b ≤ 1,100 and a + b ≥ 10, so b ≥ 10 − a. To maximize a, minimize b by substituting b = 10 − a: 120a + 100(10 − a) ≤ 1,100 simplifies to 20a ≤ 100, so a ≤ 5.",
  },
  {
    type: "student_response",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "If 2x + 3 = 9, what is the value of 6x − 1?",
    correctResponse: "17",
    explanation:
      "Multiplying both sides of 2x + 3 = 9 by 3 gives 6x + 9 = 27. Subtracting 10 from both sides gives 6x − 1 = 17.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = 8x. For what value of x does f(x) = 72?",
    choices: [
      { label: "A", body: "8" },
      { label: "B", body: "9" },
      { label: "C", body: "64" },
      { label: "D", body: "80" },
    ],
    correctLabel: "B",
    explanation: "Substituting 72 for f(x) gives 72 = 8x, so x = 9.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "f(x) = 4x + b\n\nFor the linear function f, b is a constant and f(7) = 28. What is the value of b?",
    choices: [
      { label: "A", body: "0" },
      { label: "B", body: "1" },
      { label: "C", body: "4" },
      { label: "D", body: "7" },
    ],
    correctLabel: "A",
    explanation: "Substituting 7 for x and 28 for f(x) gives 28 = 4(7) + b = 28 + b, so b = 0.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "The table gives the coordinates of two points on a line in the xy-plane:\nx = k, y = 13\nx = k + 7, y = −15\n\nThe y-intercept of the line is (k − 5, b), where k and b are constants. What is the value of b?",
    correctResponse: "33",
    explanation:
      "The slope between (k, 13) and (k + 7, −15) is (−15 − 13)/7 = −4. Using the point (k, 13) and the y-intercept (k − 5, b): −4 = (13 − b)/(k − (k − 5)) = (13 − b)/5, so 13 − b = −20, giving b = 33.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "Gabriella deposits $35 in a savings account at the end of each week. At the beginning of the 1st week of a year there was $600 in that savings account. How much money, in dollars, will be in the account at the end of the 4th week of that year?",
    choices: [
      { label: "A", body: "460" },
      { label: "B", body: "635" },
      { label: "C", body: "639" },
      { label: "D", body: "740" },
    ],
    correctLabel: "D",
    explanation: "The amount after 4 weekly $35 deposits is 600 + 4(35) = 740.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "3x = 36y − 45\n\nOne of the two equations in a system of linear equations is given. The system has no solution. Which equation could be the second equation in this system?",
    choices: [
      { label: "A", body: "x = 4y" },
      { label: "B", body: "(1/3)x = 4y" },
      { label: "C", body: "x = 12y − 15" },
      { label: "D", body: "(1/3)x = 12y − 15" },
    ],
    correctLabel: "B",
    explanation:
      "Rewriting 3x = 36y − 45 as y = (1/12)x + 5/4 shows the line has slope 1/12 and y-intercept (0, 5/4). A system has no solution when the lines are parallel but distinct. Choice B, (1/3)x = 4y, rewrites as y = (1/12)x, which has the same slope but y-intercept (0, 0) ≠ (0, 5/4).",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "−x + y = −3.5\nx + 3y = 9.5\n\nIf (x, y) satisfies the system of equations above, what is the value of y?",
    correctResponse: "3/2",
    explanation:
      "Adding the two equations eliminates x: (−x + y) + (x + 3y) = −3.5 + 9.5, so 4y = 6, giving y = 3/2.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "medium",
    stem: "(1/2)y = 4\nx − (1/2)y = 2\n\nThe system of equations above has solution (x, y). What is the value of x?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "7/2" },
      { label: "C", body: "4" },
      { label: "D", body: "6" },
    ],
    correctLabel: "D",
    explanation: "Adding the two equations eliminates y: x + 0 = 6, so x = 6.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "easy",
    stem: "x + y = 125\nx + y + y = 155\n\nThe solution to the given system of equations is (x, y). What is the value of y?",
    correctResponse: "30",
    explanation: "Substituting 125 for x + y in the second equation gives 125 + y = 155, so y = 30.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "A veterinarian recommends that each day a certain rabbit should eat 25 calories per pound of the rabbit's weight, plus an additional 11 calories. Which equation represents this situation, where c is the total number of calories the veterinarian recommends the rabbit should eat each day if the rabbit's weight is x pounds?",
    choices: [
      { label: "A", body: "c = 25x" },
      { label: "B", body: "c = 36x" },
      { label: "C", body: "c = 11x + 25" },
      { label: "D", body: "c = 25x + 11" },
    ],
    correctLabel: "D",
    explanation: "25 calories per pound of weight x gives 25x calories; adding the additional 11 calories gives c = 25x + 11.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The total cost f(x), in dollars, to lease a car for 36 months from a particular car dealership is given by f(x) = 36x + 1,000, where x is the monthly payment, in dollars. What is the total cost to lease a car when the monthly payment is $400?",
    choices: [
      { label: "A", body: "$13,400" },
      { label: "B", body: "$13,000" },
      { label: "C", body: "$15,400" },
      { label: "D", body: "$37,400" },
    ],
    correctLabel: "C",
    explanation: "Substituting 400 for x gives f(400) = 36(400) + 1,000 = 14,400 + 1,000 = 15,400.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "In the xy-plane, the boundary line of a shaded region passes through the points (−15, 36) and (0, 36), and the shaded region includes all points on and above this boundary line. Which inequality represents the shaded region?",
    choices: [
      { label: "A", body: "x ≤ 36" },
      { label: "B", body: "x ≥ 36" },
      { label: "C", body: "y ≤ 36" },
      { label: "D", body: "y ≥ 36" },
    ],
    correctLabel: "D",
    explanation:
      "Both points share the same y-coordinate (36), so the boundary is the horizontal line y = 36. Since the shaded region includes points on and above this line, the inequality is y ≥ 36.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "The graph of the equation ax + ky = 6 is a line in the xy-plane, where a and k are constants. If the line contains the points (−2, −6) and (0, −3), what is the value of k?",
    choices: [
      { label: "A", body: "−2" },
      { label: "B", body: "−1" },
      { label: "C", body: "2" },
      { label: "D", body: "3" },
    ],
    correctLabel: "A",
    explanation:
      "Rewriting ax + ky = 6 in slope-intercept form gives y = −(a/k)x + 6/k. Since (0, −3) is the y-intercept, −3 = 6/k, so k = −2.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "Line ℓ is defined by 3y + 12x = 5. Line n is perpendicular to line ℓ in the xy-plane. What is the slope of line n?",
    correctResponse: "1/4",
    explanation:
      "Rewriting 3y + 12x = 5 as y = −4x + 5/3 shows line ℓ has slope −4. The slope of a perpendicular line is the negative reciprocal: −1/(−4) = 1/4.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "(3/2)y − (1/4)x = 2/3 − (3/2)y\n(1/2)x + 3/2 = py + 9/2\n\nIn the given system of equations, p is a constant. If the system has no solution, what is the value of p?",
    correctResponse: "6",
    explanation:
      "The first equation simplifies to −3x + 36y = 8. The second simplifies to x − 2py = 6. For no solution, the equations (in standard form) must be parallel but distinct: the ratio of x- and y-coefficients must match, giving −1/3 = −2p/36, or −1/3 = −p/18, so p = 6. The constant ratio (6/8) does not equal −1/3, confirming no solution rather than infinitely many.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "hard",
    stem: "A window repair specialist charges $220 for the first two hours of repair plus an hourly fee for each additional hour. The total cost for 5 hours of repair is $400. Which function f gives the total cost, in dollars, for x hours of repair, where x ≥ 2?",
    choices: [
      { label: "A", body: "f(x) = 60x + 100" },
      { label: "B", body: "f(x) = 60x + 220" },
      { label: "C", body: "f(x) = 80x" },
      { label: "D", body: "f(x) = 80x + 220" },
    ],
    correctLabel: "A",
    explanation:
      "Let n be the hourly fee after the first two hours: f(x) = 220 + n(x − 2). Substituting x = 5, f(x) = 400 gives 400 = 220 + 3n, so n = 60. Then f(x) = 220 + 60(x − 2) = 60x + 100.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "hard",
    stem: "Hector used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained 24,000 bushels of corn when Hector began to use the auger. After 5 hours of using the auger, 19,350 bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours Hector will have been using the auger when 12,840 bushels of corn remain in the bin?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "7" },
      { label: "C", body: "8" },
      { label: "D", body: "12" },
    ],
    correctLabel: "D",
    explanation:
      "In 5 hours, 24,000 − 19,350 = 4,650 bushels were removed, a rate of 4,650/5 = 930 bushels per hour. Solving 24,000 − 930x = 12,840 gives 930x = 11,160, so x = 12.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "The function h is defined by h(x) = 4x + 28. The graph of y = h(x) in the xy-plane has an x-intercept at (a, 0) and a y-intercept at (0, b), where a and b are constants. What is the value of a + b?",
    choices: [
      { label: "A", body: "21" },
      { label: "B", body: "28" },
      { label: "C", body: "32" },
      { label: "D", body: "35" },
    ],
    correctLabel: "A",
    explanation:
      "Setting y = 0: 0 = 4x + 28 gives x = −7, so a = −7. Setting x = 0: y = 28, so b = 28. Then a + b = −7 + 28 = 21.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "If 4x − 28 = −24, what is the value of x − 7?",
    choices: [
      { label: "A", body: "−24" },
      { label: "B", body: "−22" },
      { label: "C", body: "−6" },
      { label: "D", body: "−1" },
    ],
    correctLabel: "C",
    explanation: "Dividing both sides of 4x − 28 = −24 by 4 gives x − 7 = −6.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "For line h, the table shows three values of x and their corresponding values of y: (18, 130), (23, 160), (26, 178). Line k is the result of translating line h down 5 units in the xy-plane. What is the x-intercept of line k?",
    choices: [
      { label: "A", body: "(−26/3, 0)" },
      { label: "B", body: "(−9/2, 0)" },
      { label: "C", body: "(−11/3, 0)" },
      { label: "D", body: "(−17/6, 0)" },
    ],
    correctLabel: "D",
    explanation:
      "The slope of line h is (160 − 130)/(23 − 18) = 6. Using (18, 130): 130 = 6(18) + b gives b = 22, so line h is y = 6x + 22. Translating down 5 units gives line k: y = 6x + 17. Setting y = 0 gives x = −17/6.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "hard",
    stem: "An economist modeled the demand Q for a certain product as a linear function of the selling price P. The demand was 20,000 units when the selling price was $40 per unit, and the demand was 15,000 units when the selling price was $60 per unit. Based on the model, what is the demand, in units, when the selling price is $55 per unit?",
    choices: [
      { label: "A", body: "16,250" },
      { label: "B", body: "16,500" },
      { label: "C", body: "16,750" },
      { label: "D", body: "17,500" },
    ],
    correctLabel: "A",
    explanation:
      "The slope is (15,000 − 20,000)/(60 − 40) = −250. Using (40, 20,000): 20,000 = −250(40) + b gives b = 30,000, so Q = −250P + 30,000. Substituting P = 55: Q = −250(55) + 30,000 = 16,250.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "hard",
    stem: "The table shows two values of x and their corresponding values of y: (−12, −45) and (6, 45). The graph of the linear equation representing this relationship passes through the point (1/4, a). What is the value of a?",
    correctResponse: "65/4",
    explanation:
      "The slope is (45 − (−45))/(6 − (−12)) = 90/18 = 5. Using (6, 45): 45 = 5(6) + b gives b = 15, so y = 5x + 15. Substituting x = 1/4: a = 5(1/4) + 15 = 5/4 + 60/4 = 65/4.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "A certain apprentice has enrolled in 85 hours of training courses. The equation 10x + 15y = 85 represents this situation, where x is the number of on-site training courses and y is the number of online training courses this apprentice has enrolled in. How many more hours does each online training course take than each on-site training course?",
    correctResponse: "5",
    explanation: "10x represents hours from on-site courses (10 hours each) and 15y represents hours from online courses (15 hours each). The difference is 15 − 10 = 5 hours.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "easy",
    stem: "Hiro and Sofia purchased shirts and pants from a store. The price of each shirt purchased was the same and the price of each pair of pants purchased was the same. Hiro purchased 4 shirts and 2 pairs of pants for $86, and Sofia purchased 3 shirts and 5 pairs of pants for $166. Which of the following systems of linear equations represents the situation, if x represents the price, in dollars, of each shirt and y represents the price, in dollars, of each pair of pants?",
    choices: [
      { label: "A", body: "4x + 2y = 86\n3x + 5y = 166" },
      { label: "B", body: "4x + 3y = 86\n2x + 5y = 166" },
      { label: "C", body: "4x + 2y = 166\n3x + 5y = 86" },
      { label: "D", body: "4x + 3y = 166\n2x + 5y = 86" },
    ],
    correctLabel: "A",
    explanation: "Hiro's purchase (4 shirts, 2 pants, $86) gives 4x + 2y = 86; Sofia's purchase (3 shirts, 5 pants, $166) gives 3x + 5y = 166.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "d = 16 − x/30\n\nThe equation shown gives the estimated amount of diesel d, in gallons, that remains in the gas tank of a truck after being driven x miles, where 0 ≤ x ≤ 480. What is the estimated amount of diesel, in gallons, that remains in the gas tank of the truck when x = 300?",
    choices: [
      { label: "A", body: "0" },
      { label: "B", body: "6" },
      { label: "C", body: "14" },
      { label: "D", body: "16" },
    ],
    correctLabel: "B",
    explanation: "Substituting x = 300: d = 16 − 300/30 = 16 − 10 = 6.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "ax + by = 72\n6x + 2by = 56\n\nIn the given system of equations, a and b are constants. The graphs of these equations in the xy-plane intersect at the point (4, y). What is the value of a?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "4" },
      { label: "C", body: "6" },
      { label: "D", body: "14" },
    ],
    correctLabel: "D",
    explanation:
      "Multiplying the first equation by −2 gives −2ax − 2by = −144. Adding this to the second equation eliminates y: (−2a + 6)x = −88. Since x = 4 at the intersection, (−2a + 6)(4) = −88, so −2a + 6 = −22, giving a = 14.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "hard",
    stem: "In the xy-plane, a shaded region represents the solutions to the inequality ry < 60, where r is a constant. The boundary of the shaded region is the horizontal line y = −4, and the shaded region includes all points above this line. What is the value of r?",
    choices: [
      { label: "A", body: "15" },
      { label: "B", body: "4" },
      { label: "C", body: "−4" },
      { label: "D", body: "−15" },
    ],
    correctLabel: "D",
    explanation:
      "The shaded region (all points above y = −4) represents y > −4. Multiplying both sides by −15 (which flips the inequality) gives −15y < 60, matching ry < 60 with r = −15.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "A store sells two different-sized containers of a certain Greek yogurt. The store's sales of this Greek yogurt totaled $1,277.94 last month. The equation 5.48x + 7.30y = 1,277.94 represents this situation, where x is the number of smaller containers sold and y is the number of larger containers sold. According to the equation, which of the following represents the price, in dollars, of each smaller container?",
    choices: [
      { label: "A", body: "5.48" },
      { label: "B", body: "7.30y" },
      { label: "C", body: "7.30" },
      { label: "D", body: "5.48x" },
    ],
    correctLabel: "A",
    explanation: "The term 5.48x represents total sales from x smaller containers, so 5.48 is the price of each smaller container.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "7(2x − 3) = 63\n\nWhich equation has the same solution as the given equation?",
    choices: [
      { label: "A", body: "2x − 3 = 9" },
      { label: "B", body: "2x − 3 = 56" },
      { label: "C", body: "2x − 21 = 63" },
      { label: "D", body: "2x − 21 = 70" },
    ],
    correctLabel: "A",
    explanation: "Dividing both sides by 7 gives (7(2x−3))/7 = 63/7, or 2x − 3 = 9.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "Line k is defined by y = 3x + 15. Line j is perpendicular to line k in the xy-plane. What is the slope of line j?",
    choices: [
      { label: "A", body: "−1/3" },
      { label: "B", body: "−1/12" },
      { label: "C", body: "−1/18" },
      { label: "D", body: "−1/45" },
    ],
    correctLabel: "A",
    explanation: "Line k has slope 3. A perpendicular line's slope is the negative reciprocal: −1/3.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "The point (8, 2) in the xy-plane is a solution to which of the following systems of inequalities?",
    choices: [
      { label: "A", body: "x > 0\ny > 0" },
      { label: "B", body: "x > 0\ny < 0" },
      { label: "C", body: "x < 0\ny > 0" },
      { label: "D", body: "x < 0\ny < 0" },
    ],
    correctLabel: "A",
    explanation: "The point (8, 2) has a positive x-coordinate and a positive y-coordinate, so it satisfies x > 0 and y > 0.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "easy",
    stem: "5x = 15\n−4x + y = −2\n\nThe solution to the given system of equations is (x, y). What is the value of x + y?",
    choices: [
      { label: "A", body: "−17" },
      { label: "B", body: "−13" },
      { label: "C", body: "13" },
      { label: "D", body: "17" },
    ],
    correctLabel: "C",
    explanation: "Adding the equations gives 5x + (−4x + y) = 15 + (−2), which simplifies to x + y = 13.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "hard",
    stem: "The cost of renting a backhoe for up to 10 days is $270 for the first day and $135 for each additional day. Which of the following equations gives the cost y, in dollars, of renting the backhoe for x days, where x is a positive integer and x ≤ 10?",
    choices: [
      { label: "A", body: "y = 270x − 135" },
      { label: "B", body: "y = 270x + 135" },
      { label: "C", body: "y = 135x + 270" },
      { label: "D", body: "y = 135x + 135" },
    ],
    correctLabel: "D",
    explanation: "The cost is $270 for the first day plus $135 for each of the remaining (x − 1) days: y = 270 + 135(x − 1) = 135x + 135.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "What value of p satisfies the equation 5p + 180 = 250?",
    choices: [
      { label: "A", body: "14" },
      { label: "B", body: "65" },
      { label: "C", body: "86" },
      { label: "D", body: "250" },
    ],
    correctLabel: "A",
    explanation: "Subtracting 180 from both sides gives 5p = 70, so p = 14.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "A certain open star cluster contains M-type stars and K-type stars. The estimated total mass of M-type and K-type stars in this open star cluster is 127,882 quettagrams. In the xy-plane, x represents the number of M-type stars and y represents the number of K-type stars; the line modeling the possible combinations of the two has an x-intercept at (158, 0). Based on this, which of the following is closest to the estimated mass, in quettagrams, of each M-type star in this cluster?",
    choices: [
      { label: "A", body: "811" },
      { label: "B", body: "938" },
      { label: "C", body: "51,904" },
      { label: "D", body: "75,978" },
    ],
    correctLabel: "A",
    explanation:
      "The x-intercept (158, 0) represents the cluster containing only M-type stars, so about 158 M-type stars account for the full mass. Dividing 127,882 by 158 gives approximately 809.38, closest to 811.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The front of a roller-coaster car is at the bottom of a hill and is 15 feet above the ground. If the front of the roller-coaster car rises at a constant rate of 8 feet per second, which of the following equations gives the height h, in feet, of the front of the roller-coaster car s seconds after it starts up the hill?",
    choices: [
      { label: "A", body: "h = 8s + 15" },
      { label: "B", body: "h = 15s + 335/8" },
      { label: "C", body: "h = 8s + 335/15" },
      { label: "D", body: "h = 15s + 8" },
    ],
    correctLabel: "A",
    explanation: "The initial height is 15 feet (constant term) and the rate of rise is 8 feet per second (coefficient of s): h = 8s + 15.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "According to a model, the head width, in millimeters, of a worker bumblebee can be estimated by adding 0.6 to four times the body weight of the bee, in grams. According to the model, what would be the head width, in millimeters, of a worker bumblebee that has a body weight of 0.5 grams?",
    correctResponse: "2.6",
    explanation: "The model is y = 0.6 + 4x. Substituting x = 0.5 gives y = 0.6 + 4(0.5) = 2.6.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "easy",
    stem: "In the xy-plane, a system of linear equations consists of a horizontal line passing through (0, 3) and another line passing through the points (1, 0) and (2, 3). What is the solution (x, y) to the system?",
    choices: [
      { label: "A", body: "(0, 3)" },
      { label: "B", body: "(1, 3)" },
      { label: "C", body: "(2, 3)" },
      { label: "D", body: "(3, 3)" },
    ],
    correctLabel: "C",
    explanation:
      "The horizontal line is y = 3. The other line has slope (3 − 0)/(2 − 1) = 3, giving y = 3(x − 1). Setting 3 = 3(x − 1) gives x = 2, so the solution is (2, 3).",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "If 3x − 8 = 7, what is the value of 3x + 8?",
    choices: [
      { label: "A", body: "−1" },
      { label: "B", body: "5" },
      { label: "C", body: "13" },
      { label: "D", body: "23" },
    ],
    correctLabel: "D",
    explanation: "Adding 8 to both sides of 3x − 8 = 7 gives 3x = 15. Adding 8 to both sides of that gives 3x + 8 = 23.",
  },
  {
    type: "student_response",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "10x = 86\n\nWhat value of x is the solution to the given equation?",
    correctResponse: "8.6",
    explanation: "Dividing both sides by 10 gives x = 8.6.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "Line p is defined by 4y + 8x = 6. Line r is perpendicular to line p in the xy-plane. What is the slope of line r?",
    correctResponse: "1/2",
    explanation: "Rewriting 4y + 8x = 6 gives y = −2x + 3/2, so line p has slope −2. The perpendicular slope is the negative reciprocal: 1/2.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "If 3x − 27 = 24, what is the value of x − 9?",
    choices: [
      { label: "A", body: "1" },
      { label: "B", body: "8" },
      { label: "C", body: "24" },
      { label: "D", body: "35" },
    ],
    correctLabel: "B",
    explanation: "Dividing both sides of 3x − 27 = 24 by 3 gives x − 9 = 8.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "medium",
    stem: "Line p is defined by 2y + 18x = 9. Line r is perpendicular to line p in the xy-plane. What is the slope of line r?",
    choices: [
      { label: "A", body: "−9" },
      { label: "B", body: "−1/9" },
      { label: "C", body: "1/9" },
      { label: "D", body: "9" },
    ],
    correctLabel: "C",
    explanation: "Rewriting 2y + 18x = 9 gives y = −9x + 9/2, so line p has slope −9. The perpendicular slope is the negative reciprocal: 1/9.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "medium",
    stem: "The graph in the xy-plane models the possible combinations of length x, in meters, and width y, in meters, for a rectangle with a perimeter of 36 m, with the point (8, 10) on the line. Which statement is the best interpretation of the point (8, 10) in this context?",
    choices: [
      { label: "A", body: "The length is 10 m less than the perimeter, and the width is 8 m less than the perimeter." },
      { label: "B", body: "The length is 10 m, and the width is 8 m." },
      { label: "C", body: "The length is 8 m, and the width is 10 m." },
      { label: "D", body: "The length is 8 m less than the perimeter, and the width is 10 m less than the perimeter." },
    ],
    correctLabel: "C",
    explanation: "Since x represents length and y represents width, the point (8, 10) represents a rectangle with length 8 m and width 10 m.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = (7/10)x + 55. What is the value of f(20)?",
    correctResponse: "69",
    explanation: "Substituting 20 for x gives f(20) = (7/10)(20) + 55 = 14 + 55 = 69.",
  },
  {
    type: "student_response",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "8x − 7x + 130 = 260\n\nWhat value of x is the solution to the given equation?",
    correctResponse: "130",
    explanation: "Combining like terms gives x + 130 = 260, so x = 130.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "hard",
    stem: "Adam's school is a 20-minute walk or a 5-minute bus ride away from his house. The bus runs once every 30 minutes, and the number of minutes, w, that Adam waits for the bus varies between 0 and 30. Which of the following inequalities gives the values of w for which it would be faster for Adam to walk to school?",
    choices: [
      { label: "A", body: "w − 5 < 20" },
      { label: "B", body: "w − 5 > 20" },
      { label: "C", body: "w + 5 < 20" },
      { label: "D", body: "w + 5 > 20" },
    ],
    correctLabel: "D",
    explanation: "The total time to get to school by bus is w + 5 (wait time plus the 5-minute ride). Walking (20 minutes) is faster when w + 5 > 20.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "If f is the function defined by f(x) = (2x − 1)/3, what is the value of f(5)?",
    choices: [
      { label: "A", body: "4/3" },
      { label: "B", body: "7/3" },
      { label: "C", body: "3" },
      { label: "D", body: "9" },
    ],
    correctLabel: "C",
    explanation: "f(5) = (2(5) − 1)/3 = 9/3 = 3.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "hard",
    stem: "For a linear relationship between x and y, the table gives three values of x and their corresponding values of y, where t is a constant:\nx = −34, y = t\nx = −17, y = t + 23\nx = 0, y = t + 46\n\nWhich equation represents this relationship?",
    choices: [
      { label: "A", body: "y = −2x + t + 23" },
      { label: "B", body: "y = 2x + t + 23" },
      { label: "C", body: "y = −(23/17)x + t + 46" },
      { label: "D", body: "y = (23/17)x + t + 46" },
    ],
    correctLabel: "D",
    explanation:
      "The slope is ((t+23) − t)/(−17 − (−34)) = 23/17. The graph passes through (0, t + 46), so the y-intercept is t + 46. The equation is y = (23/17)x + t + 46.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "w + 7 = 357\n\nWhat value of w is the solution to the given equation?",
    choices: [
      { label: "A", body: "51" },
      { label: "B", body: "350" },
      { label: "C", body: "364" },
      { label: "D", body: "3,577" },
    ],
    correctLabel: "B",
    explanation: "Subtracting 7 from both sides gives w = 350.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "The function f is defined by f(x) = 4x + k(x − 1), where k is a constant, and f(5) = 32. What is the value of f(10)?",
    correctResponse: "67",
    explanation:
      "Substituting x = 5: 32 = 4(5) + k(4) = 20 + 4k, so k = 3. Then f(x) = 4x + 3(x − 1) = 7x − 3, and f(10) = 70 − 3 = 67.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "(2/5)x + (7/5)y = 2/7\ngx + ky = 5/2\n\nIn the given system of equations, g and k are constants. The system has infinitely many solutions. What is the value of g/k?",
    correctResponse: "2/7",
    explanation:
      "Multiplying the first equation by 35/4 gives (7/2)x + (49/4)y = 5/2, which must equal the second equation, so g = 7/2 and k = 49/4. Then g/k = (7/2)/(49/4) = 2/7.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "medium",
    stem: "2x − y > 883\n\nFor which of the following tables are all the values of x and their corresponding values of y solutions to the given inequality?",
    choices: [
      { label: "A", body: "x: 440, 441, 442 / y: 0, −2, −4" },
      { label: "B", body: "x: 440, 442, 441 / y: 0, −2, −4" },
      { label: "C", body: "x: 442, 440, 441 / y: 0, −2, −4" },
      { label: "D", body: "x: 440, 441, 442 / y: −4, −2, 0" },
    ],
    correctLabel: "D",
    explanation:
      "Solving for y gives y < 2x − 883. At x = 440, y must be < −3; at x = 441, y must be < −1; at x = 442, y must be < 1. Only the pairing (440, −4), (441, −2), (442, 0) in choice D satisfies all three.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "d = 16t\n\nThe given equation represents the distance d, in inches, where t represents the number of seconds since an object started moving. Which of the following is the best interpretation of 16 in this context?",
    choices: [
      { label: "A", body: "The object moved a total of 16 inches." },
      { label: "B", body: "The object moved a total of 16t inches." },
      { label: "C", body: "The object is moving at a rate of 16 inches per second." },
      { label: "D", body: "The object is moving at a rate of 1/16 inches per second." },
    ],
    correctLabel: "C",
    explanation: "Since d = 16t, distance increases by 16 inches for each 1-second increase in t, meaning the object moves at 16 inches per second.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "7x + 6y = 5\n28x + 24y = 20\n\nFor each real number r, which of the following points lies on the graph of each equation in the xy-plane for the given system?",
    choices: [
      { label: "A", body: "(r, −6r/7 + 5/7)" },
      { label: "B", body: "(r, 7r/6 + 5/6)" },
      { label: "C", body: "(r/4 + 5, −r/4 + 20)" },
      { label: "D", body: "(−6r/7 + 5/7, r)" },
    ],
    correctLabel: "D",
    explanation:
      "Dividing the second equation by 4 gives 7x + 6y = 5, identical to the first — the system has infinitely many solutions along that line. Setting y = r and solving for x: 7x = 5 − 6r, so x = −6r/7 + 5/7, giving the point (−6r/7 + 5/7, r).",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "(p + 3) + 8 = 10\n\nWhat value of p is the solution to the given equation?",
    choices: [
      { label: "A", body: "−1" },
      { label: "B", body: "5" },
      { label: "C", body: "15" },
      { label: "D", body: "21" },
    ],
    correctLabel: "A",
    explanation: "Subtracting 8 from both sides gives p + 3 = 2, so p = −1.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "f(x) = 39\n\nFor the given linear (constant) function f, which table gives three values of x and their corresponding values of f(x)?",
    choices: [
      { label: "A", body: "x: 0, 1, 2 / f(x): 0, 0, 0" },
      { label: "B", body: "x: 0, 1, 2 / f(x): 39, 39, 39" },
      { label: "C", body: "x: 0, 1, 2 / f(x): 0, 39, 78" },
      { label: "D", body: "x: 0, 1, 2 / f(x): 39, 0, −39" },
    ],
    correctLabel: "B",
    explanation: "Since f(x) = 39 is constant for all x, f(x) must equal 39 for every value of x, as shown in choice B.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "hard",
    stem: "A manufacturing plant makes 10-inch, 9-inch, and 7-inch frying pans. During a certain day, the number of 10-inch frying pans that the manufacturing plant makes is 4 times the number n of 9-inch frying pans it makes, and the number of 7-inch frying pans it makes is 10. During this day, the manufacturing plant makes 100 frying pans total. Which equation represents this situation?",
    choices: [
      { label: "A", body: "10(4n) + 9n + 7(10) = 100" },
      { label: "B", body: "10n + 9n + 7n = 100" },
      { label: "C", body: "4n + 10 = 100" },
      { label: "D", body: "5n + 10 = 100" },
    ],
    correctLabel: "D",
    explanation: "The total pans made is n (9-inch) + 10 (7-inch) + 4n (10-inch) = 5n + 10, so 5n + 10 = 100.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "A mixture consisting of only vitamin D and calcium has a total mass of 150 grams. The mass of vitamin D in the mixture is 50 grams. What is the mass, in grams, of calcium in the mixture?",
    choices: [
      { label: "A", body: "200" },
      { label: "B", body: "150" },
      { label: "C", body: "100" },
      { label: "D", body: "50" },
    ],
    correctLabel: "C",
    explanation: "Since d + c = 150 and d = 50, c = 150 − 50 = 100.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function g is defined by g(x) = 6x. For what value of x is g(x) = 54?",
    correctResponse: "9",
    explanation: "Substituting 54 for g(x) gives 54 = 6x, so x = 9.",
  },
  {
    type: "student_response",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "4x + 5 = 165\n\nWhat is the solution to the given equation?",
    correctResponse: "40",
    explanation: "Subtracting 5 from both sides gives 4x = 160, so x = 40.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The graph of the linear function f is shown in the xy-plane, where y = f(x). The line passes through the points (−12, 0) and (4, 4). What is the x-intercept of the graph of f?",
    choices: [
      { label: "A", body: "(−12, 0)" },
      { label: "B", body: "(0, 0)" },
      { label: "C", body: "(1/4, 0)" },
      { label: "D", body: "(12, 0)" },
    ],
    correctLabel: "A",
    explanation: "The x-intercept is the point where the graph crosses the x-axis (y = 0), which is the given point (−12, 0).",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "medium",
    stem: "A company that provides whale-watching tours takes groups of 21 people at a time. The company's revenue is 80 dollars per adult and 60 dollars per child. If the company's revenue for one group consisting of adults and children was 1,440 dollars, how many people in the group were children?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "9" },
      { label: "C", body: "12" },
      { label: "D", body: "18" },
    ],
    correctLabel: "C",
    explanation:
      "Let x be children and y be adults: x + y = 21 and 60x + 80y = 1,440. Multiplying the first by 80 gives 80x + 80y = 1,680. Subtracting the second equation gives 20x = 240, so x = 12.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "medium",
    stem: "Line k is defined by y = (17/7)x + 4. Line j is parallel to line k in the xy-plane. What is the slope of line j?",
    choices: [
      { label: "A", body: "7/17" },
      { label: "B", body: "17/7" },
      { label: "C", body: "4" },
      { label: "D", body: "17" },
    ],
    correctLabel: "B",
    explanation: "Parallel lines have equal slopes. Line k has slope 17/7, so line j also has slope 17/7.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "−12x + 14y = 36\n−6x + 7y = −18\n\nHow many solutions does the given system of equations have?",
    choices: [
      { label: "A", body: "Exactly one" },
      { label: "B", body: "Exactly two" },
      { label: "C", body: "Infinitely many" },
      { label: "D", body: "Zero" },
    ],
    correctLabel: "D",
    explanation:
      "Multiplying the second equation by 2 gives −12x + 14y = −36, which has the same left side as the first equation (−12x + 14y = 36) but a different constant. The lines are parallel and distinct, so the system has zero solutions.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "In August, a car dealer completed 15 more than 3 times the number of sales the car dealer completed in September. In August and September, the car dealer completed 363 sales. How many sales did the car dealer complete in September?",
    correctResponse: "87",
    explanation:
      "Let x be September's sales; August's sales are 3x + 15. Then x + (3x + 15) = 363, so 4x = 348, giving x = 87.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "In the xy-plane, the graph of the linear function f contains the points (0, 3) and (7, 31). Which equation defines f, where y = f(x)?",
    choices: [
      { label: "A", body: "f(x) = 28x + 34" },
      { label: "B", body: "f(x) = 3x + 38" },
      { label: "C", body: "f(x) = 4x + 3" },
      { label: "D", body: "f(x) = 7x + 3" },
    ],
    correctLabel: "C",
    explanation: "The y-intercept is 3. The slope is (31 − 3)/(7 − 0) = 4. So f(x) = 4x + 3.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "easy",
    stem: "y = 12x − 20\ny = 28\n\nWhat is the solution (x, y) to the given system of equations?",
    choices: [
      { label: "A", body: "(4, 28)" },
      { label: "B", body: "(20, 28)" },
      { label: "C", body: "(28, 4)" },
      { label: "D", body: "(28, 20)" },
    ],
    correctLabel: "A",
    explanation: "Substituting y = 28 into the first equation: 28 = 12x − 20, so 12x = 48 and x = 4. The solution is (4, 28).",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The graph of the linear function f is shown, passing through the points (0, 2) and (6, 5). What is the y-intercept of the graph of y = f(x)?",
    choices: [
      { label: "A", body: "(−5, 0)" },
      { label: "B", body: "(2, 0)" },
      { label: "C", body: "(0, 2)" },
      { label: "D", body: "(0, −5)" },
    ],
    correctLabel: "C",
    explanation: "The y-intercept is the point where the graph crosses the y-axis, which is the given point (0, 2).",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The number y is 84 less than the number x. Which equation represents the relationship between x and y?",
    choices: [
      { label: "A", body: "y = x + 84" },
      { label: "B", body: "y = (1/84)x" },
      { label: "C", body: "y = 84x" },
      { label: "D", body: "y = x − 84" },
    ],
    correctLabel: "D",
    explanation: "\"84 less than x\" means subtracting 84 from x, so y = x − 84.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function f is defined by f(x) = 4x − 3. What is the value of f(10)?",
    choices: [
      { label: "A", body: "−30" },
      { label: "B", body: "37" },
      { label: "C", body: "40" },
      { label: "D", body: "43" },
    ],
    correctLabel: "B",
    explanation: "f(10) = 4(10) − 3 = 40 − 3 = 37.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "The function f is defined by the equation f(x) = 7x + 2. What is the value of f(x) when x = 4?",
    correctResponse: "30",
    explanation: "f(4) = 7(4) + 2 = 30.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "hard",
    stem: "0.10x + 0.20y = 0.17(x + y)\n\nThe equation gives a volume x, in gallons, of a 10% solution that could be mixed with a volume y, in gallons, of a 20% solution to produce a 17% solution. According to this equation, what volume, in gallons, of the 20% solution could be mixed with 90.0 gallons of the 10% solution to produce a 17% solution?",
    correctResponse: "210",
    explanation:
      "Substituting x = 90.0: 0.10(90.0) + 0.20y = 0.17(90.0 + y), so 9 + 0.20y = 15.3 + 0.17y. Subtracting 0.17y and 9 from both sides gives 0.03y = 6.3, so y = 210.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "Josie purchased a pass that cost $19.50 to tour a nature preserve. She also purchased 10 identical stickers to give to her nieces and nephews. The pass and the stickers cost $62.00 total. What was the cost of one sticker?",
    choices: [
      { label: "A", body: "$1.95" },
      { label: "B", body: "$4.25" },
      { label: "C", body: "$6.20" },
      { label: "D", body: "$8.15" },
    ],
    correctLabel: "B",
    explanation: "19.50 + 10x = 62 gives 10x = 42.50, so x = 4.25.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "hard",
    stem: "x(r − 9) + 4 = 19x + 27\n\nIn the given equation, r is a positive integer. If the given equation has exactly one solution, what CANNOT be the value of r?",
    choices: [
      { label: "A", body: "4" },
      { label: "B", body: "9" },
      { label: "C", body: "23" },
      { label: "D", body: "28" },
    ],
    correctLabel: "D",
    explanation:
      "Distributing and simplifying gives rx − 9x + 4 = 19x + 27, so (r − 28)x = 23. For exactly one solution, the coefficient (r − 28) cannot be 0, so r cannot be 28.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "medium",
    stem: "At how many points do the graphs of the equations y = x + 20 and y = 8x intersect in the xy-plane?",
    choices: [
      { label: "A", body: "0" },
      { label: "B", body: "1" },
      { label: "C", body: "2" },
      { label: "D", body: "8" },
    ],
    correctLabel: "B",
    explanation: "The lines have different slopes (1 and 8), so they intersect at exactly one point.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "For a snowstorm in a certain town, the minimum rate of snowfall recorded was 0.6 inches per hour, and the maximum rate of snowfall recorded was 1.8 inches per hour. Which inequality is true for all values of s, where s represents a rate of snowfall, in inches per hour, recorded for this snowstorm?",
    choices: [
      { label: "A", body: "s ≥ 2.4" },
      { label: "B", body: "s ≥ 1.8" },
      { label: "C", body: "0 ≤ s ≤ 0.6" },
      { label: "D", body: "0.6 ≤ s ≤ 1.8" },
    ],
    correctLabel: "D",
    explanation: "Since s ranges from a minimum of 0.6 to a maximum of 1.8, the inequality 0.6 ≤ s ≤ 1.8 holds for all values.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "During a portion of a flight, a small airplane's cruising speed varied between 150 miles per hour and 170 miles per hour. Which inequality best represents this situation, where s is the cruising speed, in miles per hour, during this portion of the flight?",
    choices: [
      { label: "A", body: "s ≤ 20" },
      { label: "B", body: "s ≤ 150" },
      { label: "C", body: "s ≤ 170" },
      { label: "D", body: "150 ≤ s ≤ 170" },
    ],
    correctLabel: "D",
    explanation: "The speed was at least 150 and at most 170, so 150 ≤ s ≤ 170.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "John paid a total of $165 for a microscope by making a down payment of $37 plus p monthly payments of $16 each. Which of the following equations represents this situation?",
    choices: [
      { label: "A", body: "16p − 37 = 165" },
      { label: "B", body: "37p − 16 = 165" },
      { label: "C", body: "16p + 37 = 165" },
      { label: "D", body: "37p + 16 = 165" },
    ],
    correctLabel: "C",
    explanation: "The total is the $37 down payment plus $16 per month for p months: 16p + 37 = 165.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "medium",
    stem: "y = 3x\n2x + y = 12\n\nThe solution to the given system of equations is (x, y). What is the value of 5x?",
    choices: [
      { label: "A", body: "24" },
      { label: "B", body: "15" },
      { label: "C", body: "12" },
      { label: "D", body: "5" },
    ],
    correctLabel: "C",
    explanation: "Substituting y = 3x into the second equation gives 2x + 3x = 12, so 5x = 12.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "8x + 11y = 170\n\nThe equation gives the possible combinations of the number of 2009 premium grade Log Cabin Pennies, x, and the number of 1996 select grade Lincoln Pennies, y, in a collection that is worth a total of $170. If there are 6 1996 select grade Lincoln Pennies in the collection, how many 2009 premium grade Log Cabin Pennies are in the collection?",
    correctResponse: "13",
    explanation: "Substituting y = 6: 8x + 11(6) = 170, so 8x + 66 = 170, giving 8x = 104 and x = 13.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "Valentina bought two containers of beads. In the first container 30% of the beads are red, and in the second container 70% of the beads are red. Together, the containers have at least 400 red beads. Which inequality shows this relationship, where x is the total number of beads in the first container and y is the total number of beads in the second container?",
    choices: [
      { label: "A", body: "0.3x + 0.7y ≥ 400" },
      { label: "B", body: "0.7x + 0.3y ≤ 400" },
      { label: "C", body: "x/3 + y/7 ≤ 400" },
      { label: "D", body: "30x + 70y ≥ 400" },
    ],
    correctLabel: "A",
    explanation: "Red beads from container 1 are 0.3x, from container 2 are 0.7y; \"at least 400\" gives 0.3x + 0.7y ≥ 400.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "y = x + 4\n\nWhich table gives three values of x and their corresponding values of y for the given equation?",
    choices: [
      { label: "A", body: "x: 0, 1, 2 / y: 4, 5, 6" },
      { label: "B", body: "x: 0, 1, 2 / y: 6, 5, 4" },
      { label: "C", body: "x: 0, 1, 2 / y: 2, 1, 0" },
      { label: "D", body: "x: 0, 1, 2 / y: 0, 1, 2" },
    ],
    correctLabel: "A",
    explanation: "Substituting x = 0, 1, 2 into y = x + 4 gives y = 4, 5, 6, matching choice A.",
  },
  {
    type: "multiple_choice",
    topic: "Linear functions",
    difficulty: "easy",
    stem: "As part of a science project on evaporation, Amaya measured the height of a liquid in a container over a period of time. The function f(x) = 33 − 0.18x gives the estimated height, in centimeters (cm), of the liquid in the container x days after the start of the project. Which of the following is the best interpretation of 33 in this context?",
    choices: [
      { label: "A", body: "The estimated height, in cm, of the liquid at the start of the project" },
      { label: "B", body: "The estimated height, in cm, of the liquid at the end of the project" },
      { label: "C", body: "The estimated change in the height, in cm, of the liquid each day" },
      { label: "D", body: "The estimated number of days for all of the liquid to evaporate" },
    ],
    correctLabel: "A",
    explanation: "33 is f(0), the height when x = 0 — the start of the project.",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "Leo goes to a packing store to buy containers and tape. Leo has $15. Each container costs $1.87 and each roll of tape costs $2.40. Which inequality represents the relationship between the number of containers, c, and the number of rolls of tape, t, Leo can buy?",
    choices: [
      { label: "A", body: "1.87c + 2.40t ≤ 15" },
      { label: "B", body: "1.87c + 2.40t ≥ 15" },
      { label: "C", body: "2.40c + 1.87t ≤ 15" },
      { label: "D", body: "2.40c + 1.87t ≥ 15" },
    ],
    correctLabel: "A",
    explanation: "Total cost 1.87c + 2.40t cannot exceed the $15 Leo has: 1.87c + 2.40t ≤ 15.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in one variable",
    difficulty: "easy",
    stem: "Lorenzo purchased a box of cereal and some strawberries at the grocery store. Lorenzo paid $2 for the box of cereal and $1.90 per pound for the strawberries. If Lorenzo paid a total of $9.60 for the box of cereal and the strawberries, which of the following equations can be used to find p, the number of pounds of strawberries Lorenzo purchased? (Assume there is no sales tax.)",
    choices: [
      { label: "A", body: "1.90p + 2 = 9.60" },
      { label: "B", body: "1.90p − 2 = 9.60" },
      { label: "C", body: "1.90 + 2p = 9.60" },
      { label: "D", body: "1.90 − 2p = 9.60" },
    ],
    correctLabel: "A",
    explanation: "The cost of strawberries (1.90p) plus the $2 cereal totals $9.60: 1.90p + 2 = 9.60.",
  },
  {
    type: "student_response",
    topic: "Linear equations in two variables",
    difficulty: "medium",
    stem: "24.5x + 24.75y = 641\n\nIsabel ordered topsoil and crushed stone, which cost a total of $641, for her garden. The given equation represents the relationship between the number of cubic yards of topsoil, x, and the number of tons of crushed stone, y, Isabel ordered. How much more, in dollars, did a ton of crushed stone cost Isabel than a cubic yard of topsoil?",
    correctResponse: "0.25",
    explanation: "The cost per cubic yard of topsoil is $24.50 and the cost per ton of crushed stone is $24.75, a difference of $0.25.",
  },
  {
    type: "student_response",
    topic: "Systems of two linear equations in two variables",
    difficulty: "hard",
    stem: "48x − 64y = 48y + 24\nry = 1/8 − 12x\n\nIn the given system of equations, r is a constant. If the system has no solution, what is the value of r?",
    correctResponse: "-28",
    explanation:
      "The first equation rewrites as 48x − 112y = 24. The second rewrites as 12x + ry = 1/8. For the lines to be parallel, the x-coefficient ratio must equal the y-coefficient ratio: 48/12 = 4, so −112 = 4r, giving r = −28.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "A chemist studying the impact of salt on a process mixes x kilograms of a low-salt mixture, which is 2% salt by weight, with y kilograms of a high-salt mixture, which is 96% salt by weight, to create 24 kilograms of a mixture that is 4% salt by weight. Which equation represents this situation?",
    choices: [
      { label: "A", body: "0.96x + 0.02y = (0.04)(24)" },
      { label: "B", body: "0.02x + 0.96y = (0.04)(24)" },
      { label: "C", body: "0.96x + 0.02y = 24" },
      { label: "D", body: "0.02x + 0.96y = 24" },
    ],
    correctLabel: "B",
    explanation: "Salt from the low-salt mixture is 0.02x and from the high-salt mixture is 0.96y; together they equal the salt in the final mixture, 0.04(24).",
  },
  {
    type: "multiple_choice",
    topic: "Linear inequalities in one or two variables",
    difficulty: "easy",
    stem: "The total cost, in dollars, to rent a surfboard consists of a $25 service fee and a $10 per hour rental fee. A person rents a surfboard for t hours and intends to spend a maximum of $75 to rent the surfboard. Which inequality represents this situation?",
    choices: [
      { label: "A", body: "10t ≤ 75" },
      { label: "B", body: "10 + 25t ≤ 75" },
      { label: "C", body: "25t ≤ 75" },
      { label: "D", body: "25 + 10t ≤ 75" },
    ],
    correctLabel: "D",
    explanation: "Total cost is the $25 fee plus $10 per hour: 25 + 10t ≤ 75.",
  },
  {
    type: "student_response",
    topic: "Linear functions",
    difficulty: "medium",
    stem: "A model predicts that a certain animal weighed 241 pounds when it was born and that the animal gained 3 pounds per day in its first year of life. This model is defined by an equation in the form f(x) = a + bx, where f(x) is the predicted weight, in pounds, of the animal x days after it was born, and a and b are constants. What is the value of a?",
    correctResponse: "241",
    explanation: "a represents the predicted weight at birth (x = 0), which is given as 241 pounds.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "3a + 4b = 25\n\nA shipping company charged a customer $25 to ship some small boxes and some large boxes. The equation above represents the relationship between a, the number of small boxes, and b, the number of large boxes, the customer had shipped. If the customer had 3 small boxes shipped, how many large boxes were shipped?",
    choices: [
      { label: "A", body: "3" },
      { label: "B", body: "4" },
      { label: "C", body: "5" },
      { label: "D", body: "6" },
    ],
    correctLabel: "B",
    explanation: "Substituting a = 3: 3(3) + 4b = 25, so 4b = 16, giving b = 4.",
  },
  {
    type: "multiple_choice",
    topic: "Linear equations in two variables",
    difficulty: "easy",
    stem: "What is the equation of the line that passes through the point (0, 5) and is parallel to the graph of y = 7x + 4 in the xy-plane?",
    choices: [
      { label: "A", body: "y = 5x" },
      { label: "B", body: "y = 7x + 5" },
      { label: "C", body: "y = 7x" },
      { label: "D", body: "y = 5x + 7" },
    ],
    correctLabel: "B",
    explanation: "Parallel lines share slope, so m = 7. The y-intercept is 5 (from the point (0, 5)), giving y = 7x + 5.",
  },
  {
    type: "multiple_choice",
    topic: "Systems of two linear equations in two variables",
    difficulty: "medium",
    stem: "A group of 202 people went on an overnight camping trip, taking 60 tents with them. Some of the tents held 2 people each, and the rest held 4 people each. Assuming all the tents were filled to capacity and every person got to sleep in a tent, exactly how many of the tents were 2-person tents?",
    choices: [
      { label: "A", body: "30" },
      { label: "B", body: "20" },
      { label: "C", body: "19" },
      { label: "D", body: "18" },
    ],
    correctLabel: "C",
    explanation:
      "Let x be 2-person tents and y be 4-person tents: x + y = 60 and 2x + 4y = 202. Substituting y = 60 − x: 2x + 4(60 − x) = 202, so −2x + 240 = 202, giving x = 19.",
  },
  // BATCH_MARKER
];

async function main() {
  const [existing] = await db
    .select({ id: practiceTests.id })
    .from(practiceTests)
    .where(eq(practiceTests.slug, TEST_SLUG))
    .limit(1);

  if (existing) {
    console.log(`Removing existing "${TEST_SLUG}" container before reseeding...`);
    await db.delete(practiceTests).where(eq(practiceTests.id, existing.id));
  }

  const [test] = await db
    .insert(practiceTests)
    .values({
      title: "Question Bank — Algebra",
      slug: TEST_SLUG,
      description: "Bank-only Algebra question pool, not a timed test.",
      isPublished: false,
      isBankOnly: true,
    })
    .returning();

  const [module] = await db
    .insert(testModules)
    .values({
      testId: test.id,
      section: "math",
      moduleNumber: 1,
      orderIndex: 0,
      timeLimitSeconds: 35 * 60,
    })
    .returning();

  for (let qIndex = 0; qIndex < ALGEBRA_QUESTIONS.length; qIndex++) {
    const q = ALGEBRA_QUESTIONS[qIndex];
    const [question] = await db
      .insert(questions)
      .values({
        section: "math",
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

  console.log(`Done. Seeded ${ALGEBRA_QUESTIONS.length} Algebra questions into "${TEST_SLUG}".`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
