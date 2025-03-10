
    // const lineItems = [
    //     {
    //         price_data: {
    //             currency: "inr",
    //             product_data: {
    //                 name: product.name,
    //             },
    //             unit_amount: product.amount * 100,
    //         },
    //         quantity: 1,
    //     },
    // ];

    // try {
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ["card"],
    //         line_items: lineItems,
    //         mode: "payment",
    //         success_url: "http://localhost:3000/home",
    //         cancel_url: "http://localhost:3000/team",
    //     });

    //     res.json({ id: session.id });
    // } catch (error) {
    //     console.error("Error creating checkout session:", error);
    //     res.status(500).json({ error: "Failed to create checkout session" });
    // }