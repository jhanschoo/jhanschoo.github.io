---
title: "The Implicit Association Test, and (not) Predicting Behavior"
description: "..."
pubDate: "2026-05-18"
tags:
  [
    "brook",
    "psychology",
    "implicit association test",
    "iat",
  ]
draft: true
---

TODO: LW crosspost

Epistemic Status: Literature review; confident where sources are cited, mildly confident elsewhere.

Epistemic Effort: I read the 1998 IAT paper itself, every linked source and post published after it, had some AI chatbot conversations and little else.

## Overview

Ever since its creation, the *Implicit Association Test (IAT)* and the notion of *implicit bias* have seen widespread use and attention even outside academia. While the IAT and descendant tests of implicit preferences and attitudes have identified topics in which they have shown uncontroversial utility, it is with respect to the measurement of high-stakes topics like racial prejudice that its creators have championed the test most overtly as a useful tool. It is also in high-stakes topics that its use is most controversial.

Within the rationalist community, Scott Alexander acknowledges the IAT's utility with respect to measuring some aspect of one's attitudes, but is skeptical how well it translates to actual behavior. Indeed, since the 2010s, meta-analyses have cast doubt on how well IAT measures relate to behavior, and how or whether implicit bias causally relates to discriminatory acts; Scott Alexander cites the major critical meta-analyses of the IAT.

This post primarily narrates through meta-analyses the lost optimism that the IAT might reliably predict behavior. Alongside this, we give a short explanation of the IAT itself, and briefly discuss the notion of implicit bias itself and the reliability of the IAT at measuring it. We also briefly discuss what Scott Alexander has written on IAT and behavior.

### Scott Alexander on the IAT

Within the rationalist community, Scott Alexander seems to accept it as an indicator, at some level, of a societal bias, as in [here (2009)](https://www.lesswrong.com/posts/iYJo382hY28K7eCrP/the-implicit-association-test) and [here (2014)](https://slatestarcodex.com/2014/09/30/i-can-tolerate-anything-except-the-outgroup/). There and elsewhere, he has also expressed his skepticism that the IAT predicts prejudiced behavior, or prejudice as a whole when we take conscious attitudes into account. Most succinctly, in 2016, in an imagined interviewer question to then-presidential candidate Hillary Clinton, [he writes](https://slatestarcodex.com/2016/10/13/more-hardball-debate-questions/):

> If your local newspaper says that white people usually have friendly and positive interactions with the police but black people are victimized and killed by police, that is some heavy association of whites with positive feelings and blacks with negative feelings. If you usually see photos of white people in the news under the headline “LOCAL BUSINESS BOUGHT BY GOOGLE”, and photos of blacks in the news under the headline “LEARN HOW OUR RACIST SOCIETY KEPT THIS POOR WOMAN FROM SUCCEEDING” then once again, you’re learning to associate whites with positive feelings and blacks with negative feelings.

> This would explain very nicely why people taking the IAT generally associate whites with positive feelings and blacks with negative feelings in a way apparently unrelated to whether they are explicitly prejudiced/racist. It would also explain very nicely why about 50% of blacks associate whites with positive feelings and blacks with negative feelings, which is definitely a thing that happens and which previous explanations of have always sounded unconvincing and ad hoc.

In that post, as in [another](https://slatestarcodex.com/2017/04/17/learning-to-love-scientific-consensus/), he points to [Blanton et al. (2009)](https://doi.org/10.1037/a0014665), [Oswald et al. (2013; OMBJT)](https://doi.org/10.1037/a0032734), and [Carlsson & Agerström (2016)](https://doi.org/10.1111/sjop.12288) as critical meta-analyses regarding the predictive validity of the IAT with respect to behavior. We will discuss these papers and those that they were responding to later in this post.

Other places where he has discussed the IAT include [this post (2013)](https://slatestarcodex.com/2013/04/22/implicit-association-tests-and-suicidality/) and [this post (2014)](https://slatestarcodex.com/2014/07/07/social-justice-and-words-words-words/).

### What is the IAT?

The Implicit Association Test (IAT) is a psychological test first described by [Greenwald et al. (1998)](https://pubmed.ncbi.nlm.nih.gov/9654756/). One unfamiliar with it can get a feel for what it is like [here](https://implicit.harvard.edu/implicit/), or [here](https://www.psytoolkit.org/experiment-library/iat.html#_run_the_demo) (although it would be administered with more rigor in some academic settings). It takes about 15 minutes for a demo. Nevertheless, I shall describe it in writing:

A participant taking the IAT undergoes seven *blocks* of about 50 *trials* or so each, and is presented with a display, a left button, and a right button. In each block, *singular* (e.g., pleasant, unpleasant, flower, insect, etc.) concept labels or *compound* (pleasant+flower, pleasant+insect, unpleasant+flower, etc.) concept labels are placed on the left and right sides of the screen in a deliberate way. In each trial, a word (e.g., bee, disaster, crocus) belonging to exactly one of the concepts is displayed, and the participant should press the left or right button as quickly as possible, depending on the correct category of the word. An example test for white/black racial bias may be as follows:

The example's concepts are:
- White names (e.g., Amanda, Harry, Stephen).
- Black names (e.g., Jamel, Torrance, Lakisha).
- Pleasant words (e.g., caress, freedom, laughter).
- Unpleasant words (e.g., crash, filth, cancer).

The blocks in sequence are:

1. (Target concept) Left: Black; Right: White.
2. (Associated attribute) Left: Pleasant; Right: Unpleasant.
3. (Combined task) Left: Black+Pleasant; Right: White+Unpleasant.
4. (Combined task, again) Left: Black+Pleasant; Right: White+Unpleasant.
5. (Reverse target concept) Left: White; Right: Black.
6. (Reverse combined task) Left: White+Pleasant; Right: Black+Unpleasant.
7. (Reverse combined task, again) Left: White+Pleasant; Right: Black+Unpleasant.

The participant might be faster at associating combined tasks one way over another, e.g., White+Pleasant/Black+Unpleasant over Black+Pleasant/White+Unpleasant, in which case we might presume that the participant has an implicit bias towards White+Pleasant/Black+Unpleasant. In this way, one hopes that the IAT may reveal biases that participants are unaware of, and/or find inconvenient to self-report.

### The implicit–explicit correlation

Here and below we will cite correlations in terms of Pearson's *r*, which is standard in the literature. Recall that an *r=.24* means that either variable explains just *r^2=.0576* of the variance in the other, but note also that tests are subject to many sources of attenuation (noise).

An obvious question one may ask is, *how correlated are so-called implicit biases measured by the IAT with explicit measures like self-reports (e.g., surveys/questionnaires clearly asking about the topic)?* [Hofmann et al. (2005)](https://doi.org/10.1177/0146167205275613) studied this in a meta-analysis with a positive answer. They found a correlation coefficient *r=.24*.

> the IAT and explicit self-reports are systematically related to one another and \[...\] variations in correlations can be explained by the degree of spontaneity of explicit self-reports, the level of conceptual correspondence between measures, and method-related aspects of the IAT.

On the other hand, evidence was not found that the degree of social desirability or introspection associated with a topic influenced implicit-explicit correlations. Some terms benefit from explanation here.

- By *degree of spontaneity,* the researchers mean, "How much do people rely on their gut reactions when asked to report their attitudes on the topic/personality characteristics?"
- By *conceptual correspondence,* the researchers mean it in a specific way discussed by [Fishbein & Ajzen (1975)](https://people.umass.edu/aizen/f&a1975.html). Here, "For example, implicit measures are often considered to reflect affective rather than cognitive evaluations. Hence, correlations may be higher for affective as compared to cognitive self-report measures" (which their meta-analysis later bears out).
- By *social desirability,* the researchers mean, "How much are people in general concerned about whether their attitudes or personality characteristics are socially acceptable?"
- By *introspection,* the researchers mean, "In everyday life, how much time do people spend thinking about their attitudes and personality characteristics?"

### The IAT and behavior in the 2010s

Other than the implicit-explicit correlation, one might ask, *how correlated are implicit biases measured by the IAT with later behavior?* Here begins a long journey of reality failing to bear out initial hopes. Since the IAT was developed, it has been deployed widely, including where "a small number of studies are being used to make strong claims in applied settings, including courtrooms", says [Blanton et al. (2009)](https://doi.org/10.1037/a0014665), citing [Feuss & Sosna (2007)](https://www.law.com/article/almID/900005492108/?slreturn=20260516205417). This is alarming to the authors, who in their paper reviewed two influential studies, finding that "the inclusion of race \[IAT\] scores in regression models \[against behavior\] reduced prediction errors by only tiny amounts, and \[IAT\] scores did not permit prediction of individual-level behaviors". It seems that in the 2000s, there was enthusiasm and some naivete regarding the power and simple interpretation of IAT scores.

Nevertheless, in that same year, we find an influential meta-analysis [Greenwald et al. (2009; GPUB)](https://doi.org/10.1037/a0015575) by the IAT authors establishing predictive validity (i.e., how well IATs predict behavior). More subtly, "The more highly IAT and self-report measures were intercorrelated, the greater was the predictive validity of each", noting also that "(a) \[the\] predictive validity of self-report measures (but not of IAT measures) was sharply reduced when research topics were socially sensitive, (b) IAT measures had greater predictive validity than did self-report measures for criterion measures involving interracial behavior and other intergroup behavior".

Note that when it comes to studies regarding behavior, behavior is measured in terms of whether it satisfies criteria (and if relevant, to what degree). Predictive validity may be described in terms of regression on the criteria as in Blanton et al. (2009), or as e.g. implicit-criterion correlation (ICC), as in GPUB.

However, [Oswald et al. (2013; OMBJT)](https://doi.org/10.1037/a0032734), which include some of the authors of the Blanton et al. (2009) paper, conducted a meta-analysis that focused on Black/White ICCs, and found that rather than GPUB's *r=.236*, they estimate *r=.15*. They rather conclude that "IATs were poor predictors of every
criterion category other than brain activity, and the IATs performed no better than simple explicit measures".

[Greenwald et al. (2015)](https://doi.org/10.1037/pspa0000016) respond, observing primarily that this is due to GPUB's narrower inclusion policy for studies:

> GPUB's inclusions were guided by the authors’ stated expectations for findings, which were based mostly on two familiar hypotheses: (a) measures of attitude toward a group should predict behavior favorable or unfavorable to the group and (b) measures of a stereotype of the group should predict stereotype-consistent judgments or behavior toward members of that group. As one example, the use of an IAT measure of a stereotype, one linking Black versus White race to athletics versus academics, to predict judgments about a Black person’s academic involvement was included (cf., Amodio & Devine, 2006) by GPUB, whereas the use of an IAT attitude measure of Black versus White racial preference was not expected to correlate with that same criterion measure of a Black person’s relative skills at athletics versus academics, and was therefore not included.

> OMBJT stated a broader inclusion policy: “We included any study for which an \[ICC\] could be computed where the criterion arguably measured some form of discrimination” (p. 177). This policy did not require a theoretical basis for expecting a positive correlation, such as attitude-behavior consistency or stereotype-judgment consistency. For example, OMBJT included two correlations from the Amodio and Devine (2006) study that GPUB had excluded, as explained just above.

> Although OMBJT’s strategy led to inclusion of ICCs that were excluded by GPUB’s strategy, their policy nevertheless is (a) a reasonable one that (b) fits with the well-known methodological strategy of assessing *discriminant validity.* Just as one wishes to know that predictor measures successfully correlate with measures of constructs to which they are conceptually related (*convergent validity*) it is also desirable to know that predictors do not correlate with constructs to which they have no conceptual connection. By limiting their focus to expected predictive validity correlations (a convergent validity strategy) GPUB did not aim to assess discriminant validity.

On this, [Oswald et al. (2015)](https://doi.org/10.1037/pspa0000023) offer a different perspective on the difference in policy. (Note: the term *coding*, which appears in the quote, generally refers to the development of criteria against which phenomena or already collected data are measured.)

> What is at issue here is not the presence or absence of a theory guiding inclusion decisions, as Greenwald et al. (2015) suggest. Rather, the issue is should the various theories or hypotheses of each individual IAT researcher determine whether an effect should be included in a meta-analysis and how it should be coded, or should this be determined by explicit decision rules that apply across studies? Unlike Greenwald et al. (2009), we took a more typical approach in which the meta-analyst articulates a priori decision rules for coding all effects, ensuring that the same coding scheme is applied consistently across reports. If the meta-analyst instead defers to the judgment of different researchers in different research reports, inconsistency and the omission of substantial amounts of information can result. This possibility was a specific concern for us, because researchers conducting different IAT studies sometimes embraced different theories, leading to inconsistencies across reports that our inclusion criteria and coding rules addressed.

Moving on to another part of GPUB's response, GPUB argue that even small correlations are worth noting, as they "can affect many people simultaneously or because they can repeatedly affect single persons", but distinguish between its validity for predicting individual behavior and aggregate/system-level behavior:

> IAT measures can be used to predict discrimination are personnel decisions (hiring, performance evaluation, salary, promotion), law enforcement decisions (stops and searches of drivers, pedestrians, or travelers), criminal justice decisions (jury and bench verdicts, sentencing, bail setting, parole, inmate discipline), educational decisions (admissions, grading, disciplinary actions, suspensions), and health-care decisions (triage, treatment authorization, prescription). In all of these settings, IAT measures and other available predictors may be used (a) to identify persons especially prone to committing discrimination and (b) to understand system-level discrimination.

#### Individual behavior

On (a),

> IAT measures have two properties that render them problematic to use to classify persons as likely to engage in discrimination. Those two properties are modest test-retest reliability \[...\] and small to moderate predictive validity effect sizes. Therefore, attempts to diagnostically use such measures for individuals risk undesirably high rates of erroneous classifications.

They concede on (a), and Oswald et al. (2015) agree that the IAT supplies insufficient evidence to predict discrimination. In the same direction, [Carlsson & Agerström (2016)](https://doi.org/10.1111/sjop.12288) observe that:

>  Unlike the IAT, the behavioral outcomes in the literature are not based on standardized paradigms where researchers have accrued evidence on their validity and reliability across numerous studies. Rather, the outcomes are typically ad hoc behavioral experiments designed to test some specific hypothesis in a specific research context.

C&A's "meta-analysis \[on these ad hoc behavioral experiments\] suggests severe validity and reliability issues with these outcomes".

> Many outcomes do not measure discrimination at all, and among those that have operationalizations that have the potential to capture discrimination, there is little evidence of individual differences in discriminatory behavior. Accordingly, there is also little evidence that the IAT can meaningfully predict discrimination.

Here, discrimination is understood in the individual sense as in (a).

#### Aggregate behavior

On (b),

> U.S. courts have used a statistical criterion of discrimination that translates to correlational effect sizes that are often smaller than *r = .10*. This criterion is the “four-fifths rule”, which tests whether a *protected class* (identified by race, color, religion, national origin, gender, or disability status) has been treated in discriminatory fashion.

Moreover,

> As a hypothetical example, assume that a race IAT measure has been administered to the officers in a large city police department, and that this IAT measure is found to
correlate with a measure of issuing citations more frequently to
Black than to White drivers or pedestrians (profiling). \[...\]
Using OMBJT’s r = .148 value as the IAT-profiling correlation
generates the expectation that, if all police officers were at 1 SD
below the IAT mean, the city-wide Black-White difference in
stops would be reduced by 9,976 per year (5.7% of total number of
stops) relative to the situation if all police officers were at 1 SD
above the mean. \[...\] Small effects can produce substantial discriminatory impact also by cumulating over repeated occurrences to the same person. \[...\] Many research studies provide evidence for discrimination in situations that allow for repeated impacts on the same person. \[...\] \[For example\] Studies of school discipline and suspensions have found that Black and Hispanic students are more
frequently disciplined in ways likely to result in school dropout
(Carter, Fine, & Russell, 2014). Appraising the cumulative impact of repeated experiences of discrimination is straightforward. \[Here Greenwald et al. (2015) describe a simple model.\] \[...\] sociologist Robert K. Merton (1968) described the Matthew
effect as a “cumulative advantage \[that\] operates in many systems
of social stratification to produce the same result: the rich get
richer at a rate that makes the poor become relatively poorer.”

That is, Greenwald et al. (2015) seem to have appealed first to a legal test to argue for the IAT's relevance. Next, using hypothetical police searches as an example, they argue that the IAT may correlate with societal behavior that in the aggregate amounts to discrimination. Oswald et al. (2015) primarily responded to (b). I will omit their response to the legal test example. On the second point, Oswald et al. (2015) say that "We do not doubt that the effects of small negative events can, in principle, accumulate over time with consequential effects, but whether this happens for the kinds of outcomes studied in IAT research needs to be evaluated empirically rather than simply stipulated. Cumulative effect modeling is more complex than invoking a compound interest formula".

> The inferences they make using this model are problematic because the model is too simple and arbitrary in form to serve as a useful illustration. To provide one example, the model seeks to account for the degree of negative impact of repeated events but does not differentiate repetition of a highly negative event from repetition of a slightly negative event. The model also ignores potential dependency structures among repeated events, suggesting, for example, that there are no order effects in impact (a discriminatory act experienced for the first time is as influential as that act experienced the 20th time), nor does it take into account time or context effects.

If one reliably observes correlative behavior in individuals, that is empirical evidence at least with respect to behavior measured in the lab. If one reliably observes population-wide differences in behavior, that is empirical evidence for that. But Greenwald et al. (2015) were extrapolating individual behavior in the lab to population-level aggregate prejudiced behavior, without empirical evidence of its validity, appealing instead to an unreasonably "straightforward" model. As applied to the admittedly illustrative and hypothetical policing example:

> Without concrete information about where on the implicit bias dimension the average police officer score is or how heterogeneous scores are in a distribution for police officers, we cannot draw meaningful conclusions about the relation of implicit bias to racial profiling. The profiling example obscures these complications and moves us away from the type of empirical grounding that we believe is essential for claims of societal significance. Equally important, this example erroneously infers causation for implicit bias in police stops from the weak observed correlation between IATs and behavior found in laboratory experiments. \[...\] it bears no relation to established empirical facts and is likely to be misunderstood and misused by persons rightly concerned about the mistreatment of minorities by police, causing them to ascribe more explanatory power to implicit bias than is presently justified.

They also say,

> Whether the small effects of unconscious bias that are suggested as at least possible from these meta-analyses will in reality grow, be contained, or disappear in complex, real-world social systems is a question that should be resolved through vigorous empirical testing, not computer simulations and thought experiments that, by their nature, must rely on strong yet untested assumptions.

Greenwald's lab continued to defend the view that ICCs are large, if IATs are properly conducted. They published in [Kurdi et al. (2018)](https://doi.org/10.1037/amp0000364) a meta-analysis, concluding:

> We found significant implicit–criterion correlations (ICCs) and explicit–criterion correlations (ECCs), with unique contributions of implicit and explicit measures revealed by structural equation modeling. \[...\] Studies with a declared focus on ICCs, standard IATs \[...\], and high implicit–criterion correspondence (k = 13) produced a mean ICC of r = .37. Studies scoring low on these variables (k = 6) produced an ICC of r = .02.  Examination of methodological properties—a novelty of this meta-analysis—revealed that most studies were vastly underpowered and analytic strategies regularly ignored measurement error.

That is, the authors thought that many studies were flawed and used unvalidated variants of the IATs, and failed to find significant correlations as a result.

One then presumes that following this, there might be further landmark studies and meta-analyses using the IAT with robust studies demonstrating high predictive validity for the IAT in socially sensitive, high-stakes topics. On the contrary, with respect to race, [Schimmack (2021)](https://replicationindex.com/2021/06/13/predictive-validity-race-iat/) observes that "little progress has been made in uncovering moderators of predictive validity. One possible explanation for this is that previous meta-analysis may have overlooked one important source of variation in effect sizes, namely publication bias".

Moreover, a meta-analysis by [Forscher et al. (2019)](https://doi.org/10.1037/pspa0000160) found that interventions can be made to change implicit measures, "but those changes do not necessarily translate into changes in explicit measures or behavior". Rather, [Payne (2021)](https://doi.org/10.1016/j.tics.2021.08.001) raises the possibility that:

> implicit bias can be considered a cognitive reflection of systemic racism in the environment. In this view, implicit bias is an ongoing set of associations based on inequalities and stereotypes in the environment. As such, implicit bias changes when contexts change.

One thus understands that there is not a simple mechanism by which IATs across the board measure some notion of implicit bias that causally predicts behavior.

Within race itself at the macro level, IATs are still correlated with disparities in behavior like policing, or inequities in education. But an empirically validated causal model linking them does not exist today. Moreover, there are, of course, other sociological tools to measure some societal version of prejudice that may be more accessible. Hence, generally speaking, we may today at least understand the value of IATs to be that they demonstrate that prejudices in society have some (not simply causal) correlation with our automatic associations.

#### Where the IAT is uncontroversially useful

Nevertheless, while the IAT and its variants are only weakly but significantly correlated with behavior, and can be used in addition to other tests to give incremental validity to the measurement of an attitude or preference, these implicit measures still find utility in certain places. I shall only list them out without reference to sources, as going into detail is out of scope. For example, they may be used to estimate consumer preferences, including where some choices may be stigmatized. They may be used to estimate political voter behavior even among voters where some are undecided. They may be used to identify people who may develop a drinking problem, guiding decisions for cognitive retraining or counseling. Closer to clinical psychological phenomena, they may be used to test for phobias and anxiety that have highly automatic components.

### On the "implicit"

With the main point of controversy concluded, I shall summarily discuss a couple of questions related to the IAT: *What is implicit bias? How well does the IAT measure implicit bias?*

The IAT demonstrates high *internal consistency,* meaning that if we chop up the results of a session into two results, they are likely to closely match. On the other hand, the IAT exhibits poor *test-retest reliability,* meaning that results greatly differ across tests held some time apart; but this varies greatly across topics. One might interpret these statistics to mean that a highly situational and ephemeral *state* forms a significant part of what is measured. Nevertheless, to the extent that some long-term *trait* is measured, we may call that *implicit bias*. The word is suggestive of certain notions. Indeed, early on psychologists wondered if the IAT might measure unconscious associations that were independent of explicit preferences, in which covertly "implicit" preferences are contrasted with explicit ones; a hypothesis that has not been borne out empirically, as studies observe implicit–explicit correlations. Today we may take the term "implicit" to mean "indirect" as in "indirectly measured", without any theoretical commitments, or to mean "automatic". As evidenced by the controversy regarding its predictive validity with respect to behavior, ever since the IAT's creation, psychologists have proposed many theories regarding the cognitive processes underlying implicit bias and IAT results, seemingly without a definitive model that may explain them. The papers we have cited earlier also frequently discuss them. This is worth a discussion on its own, and we shall not go into it in more detail.

For more on methodology and theory on the IAT and "implicit cognition", see [Greenwald & Lai (2020)](https://doi.org/10.1146/annurev-psych-010419-050837). An editorial [Röhner & Iliescu (2023)](https://doi.org/10.1027/1015-5759/a000778) summarizes concerns that researchers may have about IATs and what can be done by proponents to resolve them.

### Closing thoughts

The IAT has frequently been deployed to inform all kinds of decisions, and since its development has been refined for specialized purposes and topics, though I have not focused on those positive developments. Rather, because it is best known for measuring prejudice and has been frequently promoted by Greenwald for that topic, and because it has a low correlation with prejudiced behavior while interventions based on it frequently involve some high-stakes form of deprivation, the test has frequently received valid criticism regarding its suitability for this purpose. Here I have discussed that aspect at length because of the popular understanding of it and Scott Alexander's interest in it. Many LessWrongers might be interested in the IAT for the purpose of personal entertainment and edification. I don't see too much harm in it, as long as one at least doesn't put too much stock in the results and the notion of implicit bias. If people are more invested, they may perform some introspection and self-observation of how their automatic preferences and attitudes translate into behavior, and to what extent conscious thought governs their behavior in these topics instead.