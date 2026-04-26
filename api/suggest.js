export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: "Nouveau message du Musée !",
        embeds: [{
          description: req.body.message || "Pas de message", // Adapte selon tes champs
          color: 5814783
        }]
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Erreur Discord');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
