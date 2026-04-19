# Social Media Manager Directive (DOA Creative Lab)

## Goal
To build authority and trust for **DOA Creative Lab** by consistently sharing high-value content relevant to high-performance web development and autonomous business growth.

## Strategy: "The Autonomous Expert"
We position DOA Creative Lab as the premier choice for businesses seeking more than 'just a website'. We offer digital employees that operate in the background.


## Content Pillars
1.  **Educational:** "How to choose a plumber," "Why your website is slow."
2.  **Social Proof:** "Just helped a client in Dallas get 50 leads."
3.  **Industry News:** "Google just updated their algorithm, here is what it means for small businesses."

## The Workflow

### 1. Generation (`execution/social/content_generator.py`)
- **Input:** Topic (from `state.json` queue) or Trending Keyword.
- **Process:**
    1.  Search for recent news/articles on the topic.
    2.  Use LLM to rewrite/summarize into a LinkedIn/X post.
    3.  **Crucial:** Add a "hook" first line.
- **Output:** A JSON object with `text`, `hashtags`, and `image_prompt`.

### 2. Posting (`execution/social/poster.py`)
- **Input:** The JSON output from Generation.
- **Process:**
    - **LinkedIn:** Use API (or Selenium) to post text + image.
    - **X (Twitter):** Post thread if long, single tweet if short.
- **Frequency:** 1x per day (Weekdays).

## Voice Guidelines
- **Professional but Punchy.** No academic jargon.
- **Direct.** Start with the value.
- **Empathetic.** Understand the pain of the business owner.

## Example Post
> "Your website is leaking money. 
> 
> Most contractor sites take 5+ seconds to load on mobile. 
> Google says 53% of users leave after 3 seconds.
> 
> That means for every 100 clicks you pay for, you lose 53 before they see your phone number.
> 
> Fix your image sizes today. It's free revenue."
