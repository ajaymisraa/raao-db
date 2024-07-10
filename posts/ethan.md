---
title: 'Introducing Ethan: An Innovative Approach to High-Demand Mental Health Support'
date: '07/01/2024'
author: 'Ajay Misra'
tags: ['Mental Health', 'AI', 'Community Support']
---

### Trigger Warning
This article discusses topics related to suicide, suicidal ideation, self-harm, and mental health issues. The content may be distressing or triggering for some readers. If you or someone you know is struggling with these issues, please consider seeking support from a mental health professional or reaching out to a trusted person in your life.

:::model-example
date: Friday 10:32 AM
output: Hey man can you talk
date: Friday 6:41 PM
input: poker tn?
output: Nah don't really feel up for it
date: Yesterday 5:32 PM
output: What's up man u free to talk?
date: (Yep, this is a real submitted conversation.)
:::

## Background

The demand for suicide hotlines has surged significantly, highlighting the immense pressure on these services to manage the overwhelming volume. Since its launch in July 2022, the 988 Suicide and Crisis Lifeline has handled over 5.5 million contacts, illustrating the critical need for mental health support ?[*[Health.mil](https://health.mil/News/Dvids-Articles/2023/11/10/news457600)*] ?[*[NYU](https://publichealth.nyu.edu/events-news/news/2023/11/29/988-suicide-crisis-lifeline-opportunities-and-challenges)*]. In Arizona, transitioning to the 988 hotline resulted in a 45% increase in call volume, with about 5,000 calls monthly, showcasing the strain on crisis intervention resources ?[*[12News](https://www.12news.com/article/news/local/988-hotline-takes-60000-calls-first-year/75-5c79b28e-219d-4e1d-9145-8e215556c6af)*].

Men, in particular, face significant challenges in seeking mental health support due to societal stigma and expectations of self-reliance, further complicating the ability of hotlines to scale effectively. This stigma often prevents men from reaching out, exacerbating the pressure on already overwhelmed crisis services.

On a personal note, as an 18-year-old male, I've witnessed this reality firsthand. Despite being active and fun-loving, many of my close friends have confided in me that they've considered suicide (in most cases, I learned about this months after the fact). I know several that have been physically abused, drugged or "roofied", among other terrible things. Sadly, they avoid seeking help due to fear of ostracization and stigma. I wish I could say that my story is an outlier, but it's far from unique. According to the World Health Organization (WHO)?[*[WHO](https://www.who.int/news-room/fact-sheets/detail/suicide)*], suicide is the second leading cause of death among 15-to-29-year-olds globally. The American Foundation for Suicide Prevention (AFSP)?[*[AFSP](https://afsp.org/get-help/)*] reports that men die by suicide 3.63 times more often than women. Despite these alarming numbers, many men don't seek help. A study published in the Journal of Health Psychology?[*[NIH](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6560805/)*] found that men are significantly less likely than women to seek help for mental health issues, with 60% of men citing fears of being perceived as weak.

Addressing this problem requires promoting open conversations about mental health and encouraging men to seek help without fear of judgment. Yet, very little infrastructure is set up to promote these conversations, and, unfortunately, fewer men are receptive to listen to these tough conversations. Although vital strides have been taken to encourage mental health support, the stigma against support, especially for men, causes many demographics to feel alone in one of the most challenging battles they will face. 

June is Men's Mental Health, so I am glad that we are announcing Ethan on July 1st. 

:::model-example
date: Today 2:32 AM
output: wish i wasn't born
input: happens
date: (Yep, this is a real submitted conversation.)
:::

# Introducing Ethan
Ethan, an arbitrary name, meaning "firm", "strong", and "enduring"?[*RAAO has no religious affiliation, [we found](https://en.wikipedia.org/wiki/Ethan_(given_name)) Ethan a common name and our intention is to resonate with as many people as possible.*], is a large language model (LLM)?[*We built Ethan off of a fine tuned and heavily modified version of [Llama 3 70B](https://llama.meta.com/llama3/).*], similar to ChatGPT, that uses a safe practices designed to be a discrete, reliable, and emotionally compenent companion. 

With Ethan, users can simply just text his phone number and, as you converse, Ethan develops a profile of each user. Whether Ethan's just someone you want to talk to about life, distressed, or otherwise. He is a safe support friend trained on hundreds of hours of suicide prevention intervention transcripts, mental health resources and providers, and other local referral protocals. 

There are three main parts of how Ethan works, shown in the simplified diagram below: Reference and Background, Conversation, and Referral and Action. 

<img src="/ethan-fc.png" alt="Ethan FC" style="width: 100%; height: auto;">

### Reference and Background
Using another model made by Rochester Asian American Organization, we develop a list of mental health resources and providers in your local area and nation-wide reliable resources before anything happens. This model and it's partnerships will be announced in the coming weeks. Additionally, we scraped hundreds of hours of suicide prevention intervention transcripts, additional local referral protocals generated by our models, among other resources that the model can use, to gear Ethan for what it needs to do his job. This makes up the "base model".

### Conversation
Conversation is releatively straight-forward but contains the core of what Ethan excels at. First, we prompt the user, asking the user questions. If the user starts the conversation, this step is skipped. Then, after sentiment analysis, another one of our models trained from similar weights of papers in emotionally conscious fields?[*[CARER: Contextualized Affect Representations for Emotion Recognition](https://aclanthology.org/D18-1404/), [DeepEmo: Learning and Enriching Pattern-Based Emotion Representations](https://paperswithcode.com/paper/deepemo-learning-and-enriching-pattern-based), [EmotionX-IDEA: Emotion BERT – an Affectional Model for Conversation](https://ar5iv.labs.arxiv.org/html/1908.06264) -- We are still learning so much on this. As time progresses, we will add to this list to advance our model and what we know as researchers.*], we perform a language assessment (look below at Language Prompting). After generating a fitting response, we apply our user-custom model to modify our target response for to a more suitable response - one that sounds like your friend would write - and send the response out. 

### Referral and Action
If sentiment analysis triggers a positive risk factor, we refer you to one of the providers gathered in the reference step. As a fallback, we always recommend calling, or by default forwarding you to, the National Suicide Hotline. 

## Language Prompting
As Ethan learns, he adapts his language to fit yours. We developed Languge Scoring, a model designed to rate inputted language to ascertain tone, mood, language and other factors. 

:::model-example
output: how have we been man
input: honestly not too bad, had some ups and downs today, but heads high right now
output: hopefully not too much fuckin around?
input: not as much as i'd like, wouldnt hurt to fuck around more often
date: (Result from testing-phase analysis.)
:::

### Language Scoring
In the example above, the model interprets the use case of the curse word given the surrounding context, logs the capability to memory, and satirically responds.

<img src="/l2.png" alt="Language Example" width="1000" style="text-align: center;" />

At each step after tokenization (where the initial phrase is broken up for easy interpretability by the model) and safety checks, the language is holistically viewed and interpreted for future conversational use, to understand motives behind language, and to assess overall mood of what the sender is trying to convey. We studied several papers ?[*[CARER: Contextualized Affect Representations for Emotion Recognition](https://aclanthology.org/D18-1404/), [DeepEmo: Learning and Enriching Pattern-Based Emotion Representations](https://paperswithcode.com/paper/deepemo-learning-and-enriching-pattern-based), [EmotionX-IDEA: Emotion BERT – an Affectional Model for Conversation](https://ar5iv.labs.arxiv.org/html/1908.06264) -- We are still learning so much on this. As time progresses, we will add to this list to advance our model and what we know as researchers.*] (and we are still learning!) to fine tune this algorithm. 

We plan on open sourcing this algorithm on Github in the coming months. When we do so, we will release an announcement and update this article.

# Safety
...
## Storing Data
...
## What We Collect
...
## False Negatives
...

# Release
Our aim is to release a reliable model of Ethan for public use by August 18, 2024. This is an ambition goal. It's key to note that our main mission is model safety. We want a reliable and safe model to ship to production, not some half-hearted recommendation algorithm that we have seen with a few too many large companies. 

## Scalability and Future
...

If you believe in Rochester Asian American Organization's mission, please consider donations to help fuel our cause. 

---

### References
:::footnotes-section:::

### Contributions
All code, article modules, and models for this project were developed by Ajay Misra under Rochester Asian American Organization, LLC.- a 501(c)(3) non-profit organization. 

Thank you Matt Smith -- we modified his [CodePen](https://codepen.io/AllThingsSmitty/pen/jommGQ) for our article's iMessage components.

---

##
*For more information on Ethan and other initiatives by the Rochester Asian American Organization, visit our website or contact us directly.*

- [Rochester Asian American Organization](https://www.rochaao.org/)