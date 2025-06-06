import { HttpContext } from '@adonisjs/core/http'
import Stripe from 'stripe'
import env from '#start/env'

export default class LicencesController {
  private stripe = new Stripe(env.get('STRIPE_API_KEY'))

  async createPayment({ request, response }: HttpContext) {
    try {
      // Récupère les infos du formulaire
      const {
        amount, // Le prix de la licence
        playerName, // Nom du joueur
        email, // Email du joueur
      } = request.only(['amount', 'playerName', 'email'])

      // Crée le paiement Stripe
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Stripe compte en centimes
        currency: 'eur',
        automatic_payment_methods: { enabled: true },
        description: `Licence de padel - ${playerName}`,
        metadata: {
          playerName: playerName,
          email: email,
          type: 'licence_padel',
        },
      })

      return response.json({
        clientSecret: paymentIntent.client_secret,
      })
    } catch (error) {
      return response.status(400).json({
        error: 'Erreur lors de la création du paiement',
      })
    }
  }
}
