**TSSS framework built in Private Repo**

## Inspiration
We’ve dealt with the pain of learning large codebases for far too long. In the process of starting an open source project or onboarding for software engineering, one of the first tasks that a new developer goes through is learning the codebase which is a daunting and strenuous task; the large learning curve to large repos can have a significant impact on the productivity of not only the new engineer’s team, but ultimately the entire project or company. 

## What it does
Our ground-breaking TSSS model provides both code and document search to aid the new developer. Our application utilizes two main interfaces. The first is a document upload interface which serves as a tool for a company to upload documents, videos, and the via a Github link, while the second has a chat-based look where you can ask TSSS about the uploaded material! 

## How we built it
Our TSSS search engine utilizes the vast capabilities of Gemini 1.5 to help developers. When you talk to our agent, we utilize Gemini’s function calling capabilities to choose which files for the LLM to process. Once we have decided which type you want to process, we go two ways: one to the documents and mp4s and one to the codebase functionalities. To be able to retrieve information from the large codebase, **redacted**. In addition, to search our documents and videos, we utilize the Gemini LLM’s models for video and text processing. In all, this allows for a seamless process for the user to simply ask a question either about the documents, videos, or code and receive a response explanation. 

## Challenges we ran into
Throughout this incredibly rewarding experience, we faced many challenges, mainly through navigating the rate limits of the API which reduced our speed in processing the code bases, even though we were able to multithread. Threading for model training was by far the hardest challenge we ran into and it was necessary for the hack taking training from weeks to hours.	

## Accomplishments that we're proud of
Its function to pull information from github repositories that are over 20 million tokens long serves as a crucial aspect of our product that can exponentially cut the time for new developers to learn these massive codebases. 

## What we learned
Through developing our application, we learned so much about the transformative impacts of the Gemini 1.5. We learned how to utilize this newfound API not only in document and video search but also in a threading semantic syntax search model to be used for developers in the future. 

## What's next for Project TSSS (Threaded Semantic Syntax Search)
Although we were able to accomplish most of what we were set out to do, we want to scale this idea to become more readily accessible. With more time and development, we aim to create this idea into a vs-code or browser extension for developers to quickly access the meaning of their large codebases beyond a web application in addition to adding STT and TTS capabilities in order for even further ease. 