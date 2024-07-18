---
title: 'Introducing Ethan: An Innovative Approach to High-Demand Mental Health Support'
date: '07/01/2024'
author: 'Ajay Misra & The RAAO Development Team'
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

:::model-example
date: Today 2:32 AM
output: wish i wasn't born
input: happens
date: (Yep, this is a real submitted conversation.)
:::

# Introducing Ethan
Ethan, an arbitrary name, meaning "firm", "strong", and "enduring" in Hebrew?[*RAAO has no religious affiliation, [we found](https://en.wikipedia.org/wiki/Ethan_(given_name)) Ethan a common name and our intention is to resonate with as many people as possible.*], is a large language model (LLM)?[*We built Ethan off of a fine tuned and heavily modified version of [Llama 3 70B](https://llama.meta.com/llama3/). We plan to switch to a version of a secure AWS [Claude Sonnet 3.5](https://aws.amazon.com/bedrock/claude/?sec=bcomfai&pos=3) dedicated instance  in the near future.*], similar to ChatGPT, that uses a safe practices designed to be a discrete, reliable, and emotionally compenent companion. 

With Ethan, users can simply just text his phone number and, as you converse, Ethan develops a profile of each user. Whether Ethan's just someone you want to talk to about life, distressed, or otherwise. He is a safe support friend trained on hundreds of hours of suicide prevention intervention transcripts, mental health resources and providers, and other local referral protocals. Ethan is discrete, you can just put him in as a contact in your phone and it just looks like you are texting a friend.

While our primary objective with Ethan is to provide a reliable companion, we also aim to alleviate the burden on traditional crisis support services like the 988 Suicide and Crisis Lifeline. By offering an accessible, always-available option for initial support and triage, Ethan can provide immediate emotional support to individuals who may be hesitant to call a crisis line, help filter and prioritize cases, potentially reducing the volume of non-emergency calls to 988, offer personalized coping strategies and resources for those dealing with milder forms of distress, act as a bridge to professional help when necessary, facilitating warm handoffs to human crisis counselors, and collect anonymized data on mental health trends to inform better resource allocation and intervention strategies. 

Through these mechanisms, Ethan can complement existing mental health infrastructure, allowing human crisis counselors to focus their expertise on the most critical cases while ensuring that a wider range of individuals receive some form of support.

There are three main parts of how Ethan works, shown in the simplified diagram below.

<img src="/ethan-fc.png" alt="Ethan FC" style="width: 100%; height: auto;">

### Reference and Background
Using another model made by Rochester Asian American Organization, we develop a list of mental health resources and providers in your local area and nation-wide reliable resources before anything happens. This model and it's partnerships will be announced in the coming weeks. Additionally, we scraped hundreds of hours of suicide prevention intervention transcripts, additional local referral protocals generated by our models, among other resources that the model can use, to gear Ethan for what it needs to do his job. This makes up the "base model".

### Conversation
Conversation is releatively straight-forward but contains the core of what Ethan excels at. First, we prompt the user, asking the user questions. If the user starts the conversation, this step is skipped. Then, after sentiment analysis, another one of our models trained from similar weights of papers in emotionally conscious fields?[*[CARER: Contextualized Affect Representations for Emotion Recognition](https://aclanthology.org/D18-1404/), [DeepEmo: Learning and Enriching Pattern-Based Emotion Representations](https://paperswithcode.com/paper/deepemo-learning-and-enriching-pattern-based), [EmotionX-IDEA: Emotion BERT – an Affectional Model for Conversation](https://ar5iv.labs.arxiv.org/html/1908.06264) -- We are still learning so much on this. As time progresses, we will add to this list to advance our model and what we know as researchers.*], we perform a language assessment (look below at Language Prompting). After generating a fitting response, we apply our user-custom model to modify our target response for to a more suitable response - one that sounds like your friend would write - and send the response out. 

We are experimenting with active recall -- the model remembering activities and logging them for future recall to engage in active conversations.

:::model-example
input: how was that baseball game last night? 
output: dude it was so sick
input: how were the seats??
date: (Result from testing-phase analysis. Example of recall.)
:::


### Referral and Action
If sentiment analysis triggers a positive risk factor, we refer you to one of the providers gathered in the reference step. As a fallback, we always recommend calling, or by default forwarding you to, the National Suicide Hotline. 

We'd like to reiterate that Ethan *is not* an alternative or replacement for serious mental health help. We, instead, want to complement the present systems.

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
In the example above, the model interprets the use case of the curse word given the surrounding context -- similar to how an encoder and decoder model works --, logs the capability to memory, and satirically responds.

<img src="/l2.png" alt="Language Example" width="1000" style="text-align: center;" />

At each step after tokenization (where the initial phrase is broken up for easy interpretability by the model) and safety checks, the language is holistically viewed and interpreted for future conversational use, to understand motives behind language, and to assess overall mood of what the sender is trying to convey. We studied several papers ?[*[CARER: Contextualized Affect Representations for Emotion Recognition](https://aclanthology.org/D18-1404/), [DeepEmo: Learning and Enriching Pattern-Based Emotion Representations](https://paperswithcode.com/paper/deepemo-learning-and-enriching-pattern-based), [EmotionX-IDEA: Emotion BERT – an Affectional Model for Conversation](https://ar5iv.labs.arxiv.org/html/1908.06264) -- We are still learning so much on this. As time progresses, we will add to this list to advance our model and what we know as researchers.*] (and we are still learning!) to fine tune this algorithm. 

We plan on open sourcing this algorithm on Github in the coming months. When we do so, we will release an announcement and update this article.

# Pricing and Execution
Rochester Asian American Organization (RAAO) is a recognized 501(c)(3) non-profit organization committed to creating and providing top-tier, accessible resources. Our flagship initiative, Ethan, exemplifies this mission. Ethan, along with our other projects, possesses inherent scalability that allows for significant impact without the need for immediate funding.

Nevertheless, we recognize that as our initiatives grow, financial constraints will inevitably arise. To address this, RAAO has established a dedicated grant-writing and fundraising team. These teams work tirelessly to secure funds through grant applications, public donations, and university-sponsored funding campaigns.

In alignment with our mission, we are committed to ensuring that Ethan remains freely accessible to the public once it is validated as a stable and production-ready product. Through our strategic planning and community support, we are confident in our ability to sustain and expand our initiatives, continuing to serve and benefit the public effectively.


# Safety
Safety is our top priority in developing and deploying Ethan. We've implemented multiple layers of protection to ensure user wellbeing and data security.

## Storing Data
Ethan operates on a zero-retention policy for conversation data. All messages are processed in real-time and immediately discarded after generating a response. No chat logs or message histories are stored on our servers. Messages and data stored in "memory" are converted to tensors (string of numbers) and no conversational privacy data is stored in memory. These tensors are exclusively used to fine tune our model. In the case of a referral being needed, assumptions and diagnostics that are sent to the referrer are based off of the conversation that occured in the past 24 hours and inference predictions made off of said tensors. This approach ensures maximum privacy and minimizes the risk of data breaches.

We do maintain anonymized metadata for service improvement and research purposes. This includes aggregate statistics on usage patterns, response times, and general conversation topics, but nothing that could identify individual users or conversations. All data, including the minimal information we do retain, is encrypted using state-of-the-art encryption protocols. We employ end-to-end encryption for all communications, ensuring that even in the unlikely event of a breach, the data remains unreadable and secure.

## What We Collect
The only personal information we collect is:
Phone number (for message routing), Approximate location (city/state level, for local resource referrals), User-provided demographic info (optional, for tailoring responses), Tensorized memory, and a 24-hour chat history.

This minimal data collection allows us to provide a personalized experience while maintaining strong privacy protections.

It's crucial to emphasize that we never share any user information with third parties under any circumstances. Your data remains strictly within our secure systems and is used solely for the purpose of providing and improving the Ethan service.

## False Negatives
One of the most critical safety considerations for Ethan is avoiding false negatives - instances where the system fails to identify a user in crisis who needs immediate intervention. As we are still in beta phase, this process may be subject to change. To mitigate this risk, we've implemented a multi-tiered approach:

1. **Sentiment Analysis:** Our advanced natural language processing continuously monitors conversations for indicators of distress or crisis, even if not explicitly stated.

2. **Keyword Triggers:** Certain high-risk words or phrases automatically elevate the conversation for human review.

3. **Pattern Recognition:** Ethan tracks conversation patterns over time to identify subtle shifts that may indicate declining mental health.

4. **Conservative Threshold:** Our system err on the side of caution, with a low threshold for triggering interventions or referrals.

5. **Human Oversight:** A team of trained mental health professionals monitors flagged conversations in real-time, ready to intervene if necessary.

6. **Regular Audits:** We conduct frequent reviews of conversations marked as "low risk" to ensure no warning signs are being missed.

7. **Continuous Learning:** The system is constantly updated based on new research and real-world performance data to improve its ability to identify at-risk individuals.

While no system is perfect, these layered safeguards significantly reduce the risk of missing a user in crisis. We're committed to ongoing refinement and improvement of these safety measures.

# Release
Our aim is to release a reliable model of Ethan for public use by August 18, 2024. This is an ambition goal. It's key to note that our main mission is model safety. We want a reliable and safe model to ship to production, not some half-hearted recommendation algorithm that we have seen with a few too many large companies. 

## Scalability and Future
As Ethan evolves, we're committed to expanding its reach and capabilities while maintaining our core ethical principles.

### 1. Technological Expansion
Althought we currently use a cloud-native architecture for seamless scaling and distributed processing to handle millions of concurrent conversations, as funding increases, we plan on implementing a CI/CD pipeline for rapid deployement of improvements. As we increase funding, we plan on switching over from Llama 3 70B to a pretrained model of Claude 3.5 sonnet through [AWS Bedrock](https://aws.amazon.com/bedrock/claude/?sec=bcomfai&pos=3).

### 2. Broadening Access
Our main horizon is multilingual support, specifically focused on Spanish, Mandarin, and Hinti within the first year. This includes cultural adaptation and training the model for global use and different cultures. We aspire to be able to integrate with popular messaging platforms and dedicated mobile apps in the near future, too.

### 3. Enhanced Capabilities
We aim to get more engineers working on Ethan and other RAAO projects in the near future for continuous refinement for better understanding and responses. In the future, we aim to have increased personalization while maintaining privacy and, ideally, explore multimodal support (voice, image recognition, etc.). 

### 4. Collaborative Growth
We aim to grow our partnerships with local and mental health organizations and healthcare providers for a larger reach. Additionally, assist with ongoing research initiatives in AI-assisted mental support applications, and open-sourcing select components to foster innovation.

### 5. Ethical Commitment
We want to expand our unwavering focus on user privacy and data security, de-mystifying AI processes and limitations, including maintaining human oversight in critical situations. One of the most important goals from Ethan is commitmenet to accessibility regardless of socioeconomic status.

As we scale, our goal remains constant: leveraging technology to provide accessible, effective mental health support to millions worldwide. We'll continue to adapt based on user feedback and evolving mental health needs, always prioritizing ethical considerations in our growth strategy.

---

### References
:::footnotes-section:::


---

### Acknowledgements and Contributions
All code, article modules, and models for this project were developed by [Ajay Misra](https://ajaymisra.com) under Rochester Asian American Organization, LLC.- a 501(c)(3) non-profit organization. 

Thank you Matt Smith -- we modified his [CodePen](https://codepen.io/AllThingsSmitty/pen/jommGQ) for our article's iMessage components.

If you believe in Rochester Asian American Organization's mission, please consider donating to help fuel our cause. 

All outputs, including but not limited to Ethan, from Rochester Asian American Organization, LLC are protected under U.S. and international intellectual property laws (17 U.S.C. §§ 101 et seq., 15 U.S.C. §§ 1051 et seq., 35 U.S.C. §§ 1 et seq.). Unauthorized use, reproduction, distribution, or modification is strictly prohibited and may result in legal action. For permissions or licensing, contact Rochester Asian American Organization, LLC at (507) 990-2942. 

##
*For more information on Ethan and other initiatives by the Rochester Asian American Organization, visit our website or contact us directly.*

- [Rochester Asian American Organization](https://www.rochaao.org/)