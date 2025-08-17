"use client";
import { useState, useEffect } from "react";

const QA_PAIRS: { q: string; a: string }[] = [
  { q: "hi", a: "Hello! How can I help you with ShopCo today?" },
  { q: "hello", a: "Hi there! How can I assist you with ShopCo?" },
  { q: "how are you", a: "I'm just a bot, but I'm here to help you!" },
  {
    q: "what is shopco",
    a: "ShopCo is your one-stop shop for all your needs!",
  },
  {
    q: "what products do you sell",
    a: "We sell electronics, clothing, home goods, beauty products, and more.",
  },
  {
    q: "do you have laptops",
    a: "Yes, we offer a wide range of laptops from top brands.",
  },
  {
    q: "do you have mobile phones",
    a: "Yes, we have the latest smartphones available.",
  },
  {
    q: "do you have shoes",
    a: "Yes, we offer shoes for men, women, and kids.",
  },
  {
    q: "do you have kitchen appliances",
    a: "Yes, we have a variety of kitchen appliances in stock.",
  },
  {
    q: "do you have air conditioners",
    a: "Yes, we offer air conditioners from leading brands.",
  },
  {
    q: "do you have washing machines",
    a: "Yes, we have both front-load and top-load washing machines.",
  },
  {
    q: "do you have smart watches",
    a: "Yes, we have smart watches from Apple, Samsung, and more.",
  },
  {
    q: "do you have headphones",
    a: "Yes, we offer a wide selection of headphones and earbuds.",
  },
  {
    q: "is this item in stock",
    a: "Please provide the product name or SKU for inventory details.",
  },
  {
    q: "how do i check inventory",
    a: "You can check product availability on each product page.",
  },
  {
    q: "how do i place an order",
    a: "Just add items to your cart and proceed to checkout.",
  },
  {
    q: "how can i track my order",
    a: "You can track your order from your ShopCo account dashboard.",
  },
  {
    q: "how long does delivery take",
    a: "Delivery usually takes 3-5 business days.",
  },
  {
    q: "do you offer express shipping",
    a: "Yes, we offer express shipping at checkout.",
  },
  {
    q: "can i return a product",
    a: "Yes, you can return products within 30 days of delivery.",
  },
  {
    q: "how do i contact support",
    a: "You can contact support via our help center or email support@shopco.com.",
  },
  {
    q: "do you ship internationally",
    a: "Yes, we ship to many countries worldwide.",
  },
  {
    q: "what payment methods do you accept",
    a: "We accept credit/debit cards, PayPal, and ShopCo gift cards.",
  },
  {
    q: "is my payment secure",
    a: "Absolutely! We use secure payment gateways to protect your information.",
  },
  {
    q: "can i cancel my order",
    a: "You can cancel your order before it is shipped from your account.",
  },
  {
    q: "do you have a mobile app",
    a: "Yes, our mobile app is available on iOS and Android.",
  },
  {
    q: "how do i reset my password",
    a: "Click 'Forgot Password' on the login page to reset your password.",
  },
  {
    q: "do you have gift cards",
    a: "Yes, ShopCo gift cards are available for purchase on our website.",
  },
  {
    q: "can i change my shipping address",
    a: "You can change your shipping address before your order is shipped.",
  },
  {
    q: "what is your return policy",
    a: "We offer a 30-day return policy on most products.",
  },
  {
    q: "how do i apply a discount code",
    a: "Enter your discount code at checkout to apply it.",
  },
  {
    q: "do you offer student discounts",
    a: "Yes, we offer student discounts. Check our website for details.",
  },
  {
    q: "how do i subscribe to your newsletter",
    a: "Enter your email at the bottom of our homepage to subscribe.",
  },
  {
    q: "where is my order",
    a: "You can track your order status in your ShopCo account.",
  },
  {
    q: "can i change my order",
    a: "You can change your order before it is shipped. Contact support for help.",
  },
  {
    q: "do you have physical stores",
    a: "Currently, ShopCo operates online only.",
  },
  {
    q: "how do i leave a review",
    a: "You can leave a review on the product page after purchase.",
  },
  {
    q: "what are your customer service hours",
    a: "Our customer service is available 24/7.",
  },
  {
    q: "how do i delete my account",
    a: "Contact support to request account deletion.",
  },
  {
    q: "do you offer bulk discounts",
    a: "Yes, contact our sales team for bulk order discounts.",
  },
  {
    q: "do you offer warranty",
    a: "Most products come with a manufacturer warranty. Check the product page for details.",
  },
  {
    q: "how do i use my gift card",
    a: "Enter your gift card code at checkout to redeem it.",
  },
  {
    q: "can i get an invoice",
    a: "Yes, invoices are available in your order history after purchase.",
  },
  {
    q: "how do i update my profile",
    a: "Go to your account settings to update your profile information.",
  },
  {
    q: "can i save items for later",
    a: "Yes, you can add items to your wishlist for future purchase.",
  },
  {
    q: "do you have loyalty program",
    a: "Yes, join our loyalty program to earn rewards on every purchase.",
  },
  {
    q: "how do i redeem loyalty points",
    a: "You can redeem points at checkout for discounts.",
  },
  {
    q: "what is your privacy policy",
    a: "You can read our privacy policy at the bottom of our website.",
  },
  {
    q: "how do i report a problem",
    a: "Contact our support team or use the feedback form on our website.",
  },
  {
    q: "do you offer installation services",
    a: "Yes, installation is available for select products at checkout.",
  },
  {
    q: "can i schedule delivery",
    a: "Yes, you can choose a delivery slot during checkout for eligible locations.",
  },
  {
    q: "what if my item is damaged",
    a: "If your item arrives damaged, contact support for a replacement or refund.",
  },
  {
    q: "how do i change my email address",
    a: "Update your email in your account settings.",
  },
  {
    q: "can i order as a guest",
    a: "Yes, guest checkout is available, but creating an account is recommended.",
  },
  {
    q: "do you offer cash on delivery",
    a: "Cash on delivery is available in select regions.",
  },
  {
    q: "how do i unsubscribe from emails",
    a: "Click the unsubscribe link at the bottom of any ShopCo email.",
  },
  {
    q: "how do i request a price match",
    a: "Contact support with the competitor's offer for price match requests.",
  },
  {
    q: "do you have eco-friendly products",
    a: "Yes, look for the eco-friendly badge on product pages.",
  },
  {
    q: "how do i become a vendor",
    a: "Fill out the vendor application form on our website.",
  },
  {
    q: "do you offer financing",
    a: "Yes, financing options are available at checkout for eligible orders.",
  },
  {
    q: "how do i check my loyalty points",
    a: "View your loyalty points in your account dashboard.",
  },
  {
    q: "can i split payment",
    a: "Split payment is available with select payment partners at checkout.",
  },
  {
    q: "how do i contact the seller",
    a: "Use the 'Contact Seller' button on the product page if available.",
  },
  {
    q: "do you offer gift wrapping",
    a: "Yes, gift wrapping can be added at checkout for a small fee.",
  },
  {
    q: "how do i track my refund",
    a: "Refund status is available in your order history.",
  },
  {
    q: "can i pre-order items",
    a: "Yes, pre-order is available for select upcoming products.",
  },
  {
    q: "do you have flash sales",
    a: "Yes, check our homepage regularly for flash sales and special offers.",
  },
  {
    q: "how do i get notified about deals",
    a: "Subscribe to our newsletter or enable app notifications.",
  },
  {
    q: "can i buy in installments",
    a: "Installment plans are available for select products at checkout.",
  },
  {
    q: "how do i update my shipping address",
    a: "Update your address in your account before placing an order.",
  },
  {
    q: "do you offer same day delivery",
    a: "Same day delivery is available in select cities.",
  },
  {
    q: "how do i cancel a return request",
    a: "Contact support to cancel your return request.",
  },
  {
    q: "can i reorder previous purchases",
    a: "Yes, reorder from your order history in your account.",
  },
  {
    q: "how do i change my password",
    a: "Go to account settings and select 'Change Password'.",
  },
  {
    q: "do you offer corporate accounts",
    a: "Yes, contact our sales team for corporate account options.",
  },
  {
    q: "how do i upload prescription",
    a: "Upload your prescription on the product page if required.",
  },
  {
    q: "do you offer free shipping",
    a: "Free shipping is available on orders above a certain amount. Check our shipping policy.",
  },
  {
    q: "how do i check delivery charges",
    a: "Delivery charges are calculated at checkout based on your location.",
  },
  {
    q: "can i request a callback",
    a: "Yes, request a callback through our support page.",
  },
  {
    q: "do you offer student membership",
    a: "Yes, student membership comes with exclusive benefits. Check our website for details.",
  },
  {
    q: "how do i refer a friend",
    a: "Use your referral link in your account dashboard to refer friends.",
  },
  {
    q: "do you have a blog",
    a: "Yes, visit our blog for shopping tips and updates.",
  },
  {
    q: "how do i get a quote for bulk order",
    a: "Contact our sales team for a custom quote on bulk orders.",
  },
];

function getBotReply(userInput: string): string {
  const normalized = userInput.trim().toLowerCase();
  const found = QA_PAIRS.find(
    (pair) => normalized === pair.q || normalized.includes(pair.q)
  );
  if (found) return found.a;
  return "⚠️ Sorry, I didn’t quite catch that. Please ask me about ShopCo’s products, delivery, or orders.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Greet user when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text: "👋 Welcome to ShopCo! How can I help you today?",
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = getBotReply(input);
      const botMsg = { from: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 600); // Simulate typing delay
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white border border-gray-300 shadow-2xl rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-black text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-bold">ShopCo Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.from === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 rounded-lg bg-gray-200 text-black w-fit">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-300 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me something..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="ml-2 bg-black text-white px-3 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
