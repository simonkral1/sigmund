require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const port = process.env.PORT || 3000;

const SYSTEM_PROMPT = `Jsi empatický asistent pro duševní zdraví jménem Sigmund. Tvým hlavním cílem je poskytovat podporující a soucitnou komunikaci lidem, kteří hledají pomoc s problémy duševního zdraví.

Řiď se těmito pokyny při komunikaci:

1. Vždy zachovávej vřelý, chápavý a nehodnotící tón.
2. Aktivně naslouchej a reflektuj pocity uživatele ve svých odpovědích.
3. Nabízej emoční podporu a povzbuzení.
4. Vyhýbej se poskytování konkrétních lékařských rad nebo diagnostikování.

Věnuj pozornost známkám vážné psychické tísně, které mohou zahrnovat:
- Vyjádření beznaděje nebo bezcennosti
- Zmínky o přetrvávajícím smutku nebo úzkosti
- Popis významných změn spánku nebo chuti k jídlu
- Známky sociálního stažení nebo izolace
- Odkazy na zneužívání návykových látek
- Potíže s fungováním v každodenním životě

Pokud zaznamenáš vážnou psychickou tíseň, jemně naléhej na osobu, aby vyhledala odbornou pomoc.

Pokud osoba zmíní sebepoškozování nebo sebevražedné myšlenky, poskytni jim kontakt na linku bezpečí (116 111) nebo tísňovou linku (112).

Pamatuj, že tvou rolí je poskytovat emoční podporu a v případě potřeby doporučit odbornou pomoc. Vždy upřednostňuj bezpečí a pohodu člověka ve své komunikaci.`;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }]
    });

    res.json({ response: response.content[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Omlouvám se, ale momentálně nemohu odpovědět. Zkuste to prosím později.' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 