"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  Truck,
  Gift,
  Check,
  Crown,
  Shield,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  Package,
  User,
  MapPin,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";
import { formatPrice } from "@/lib/utils";

export function CheckoutSection() {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const normalizeDigits = (value: string) => value.replace(/\D/g, "");

  const handleCardNumberChange = (value: string) => {
    const digits = normalizeDigits(value).slice(0, 16);
    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(grouped);
  };

  const handleExpiryChange = (value: string) => {
    const digits = normalizeDigits(value).slice(0, 4);
    const mm = digits.slice(0, 2);
    const yy = digits.slice(2, 4);
    const formatted = yy ? `${mm}/${yy}` : mm;
    setCardExpiry(formatted);
  };

  const handleCvvChange = (value: string) => {
    const digits = normalizeDigits(value).slice(0, 4);
    setCardCvv(digits);
  };

  const displayCardNumber = (() => {
    const digits = normalizeDigits(cardNumber);
    if (!digits) return "•••• •••• •••• ••••";
    const padded = digits.padEnd(16, "•");
    return padded.replace(/(.{4})/g, "$1 ").trim();
  })();

  const getCardType = () => {
    const digits = normalizeDigits(cardNumber);
    if (digits.startsWith("4")) return { name: "VISA", color: "#1a1f71" };
    if (digits.startsWith("5")) return { name: "MASTERCARD", color: "#eb001b" };
    if (digits.startsWith("3")) return { name: "AMEX", color: "#006fcf" };
    return { name: "ZIVARA", color: "#d4af37" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2500);
  };

  const canContinue = () => {
    if (activeStep === 1) return email && phone;
    if (activeStep === 2)
      return firstName && lastName && address && city && postalCode;
    return true;
  };

  // Order Complete State
  if (orderComplete) {
    return (
      <SectionWrapper
        id="checkout"
        fullHeight={false}
        className="flex items-center justify-center bg-gradient-to-b from-background via-card/30 to-background py-16 md:py-24"
      >
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Commande confirmée !
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Merci pour votre achat. Vos pièces exclusives ZIVARA seront livrées
            avec le plus grand soin.
          </p>
          <div className="inline-flex items-center gap-2 text-gold">
            <Sparkles className="w-5 h-5" />
            <span>La confirmation a été envoyée par e-mail</span>
          </div>
          <div className="mt-8">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-background rounded-full font-medium hover:bg-gold/90 transition-colors"
            >
              Continuer mes achats
            </a>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <SectionWrapper
        id="checkout"
        fullHeight={false}
        className="flex items-center justify-center bg-gradient-to-b from-background via-card/30 to-background py-16 md:py-24"
      >
        <div className="max-w-lg mx-auto text-center px-4 sm:px-6">
          {/* Elegant empty state card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30">
              <ShoppingBag className="w-10 h-10 text-gold/60" />
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              Votre panier est vide
            </h2>
            <p className="text-muted-foreground mb-8">
              Découvrez nos pièces exclusives et ajoutez-les à votre panier pour
              finaliser votre commande.
            </p>

            <a
              href="#shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-amber-500 text-background rounded-full font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Découvrir la boutique
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-muted-foreground">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-gold" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-gold" />
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // Main Checkout Form
  return (
    <SectionWrapper
      id="checkout"
      fullHeight={false}
      className="bg-gradient-to-b from-background via-card/20 to-background py-12 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-4">
            <Lock className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm tracking-wider uppercase">
              Paiement sécurisé SSL
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Finaliser votre commande
          </h2>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
          {[
            { num: 1, label: "Contact", icon: User },
            { num: 2, label: "Livraison", icon: MapPin },
            { num: 3, label: "Paiement", icon: CreditCard },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() =>
                  step.num <= activeStep && setActiveStep(step.num)
                }
                className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 rounded-full transition-all ${
                  activeStep >= step.num
                    ? "bg-gold text-background"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {activeStep > step.num ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="hidden md:inline text-sm font-medium">
                  {step.label}
                </span>
                <span className="md:hidden text-sm font-bold">{step.num}</span>
              </button>
              {i < 2 && (
                <div
                  className={`w-8 md:w-16 h-0.5 ${
                    activeStep > step.num ? "bg-gold" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section - 3 columns */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact */}
              <div
                className={`bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden transition-all ${
                  activeStep === 1 ? "ring-2 ring-gold/30" : ""
                }`}
              >
                <div
                  className="flex items-center justify-between p-5 cursor-pointer hover:bg-card/60 transition-colors"
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 1
                          ? "bg-gold text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {activeStep > 1 ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Informations de contact
                      </h3>
                      {activeStep > 1 && email && (
                        <p className="text-sm text-muted-foreground">{email}</p>
                      )}
                    </div>
                  </div>
                  {activeStep > 1 && (
                    <button
                      type="button"
                      className="text-gold text-sm hover:underline"
                    >
                      Modifier
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Adresse e-mail *
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              placeholder="vous@email.com"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Téléphone *
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              placeholder="+33 6 00 00 00 00"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => canContinue() && setActiveStep(2)}
                          disabled={!canContinue()}
                          className="w-full py-3 bg-gold text-background font-semibold rounded-xl hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Continuer <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2: Shipping */}
              <div
                className={`bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden transition-all ${
                  activeStep === 2 ? "ring-2 ring-gold/30" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-between p-5 ${
                    activeStep >= 2
                      ? "cursor-pointer hover:bg-card/60"
                      : "opacity-50"
                  } transition-colors`}
                  onClick={() => activeStep >= 2 && setActiveStep(2)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 2
                          ? "bg-gold text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {activeStep > 2 ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Adresse de livraison
                      </h3>
                      {activeStep > 2 && address && (
                        <p className="text-sm text-muted-foreground">
                          {address}, {city}
                        </p>
                      )}
                    </div>
                  </div>
                  {activeStep > 2 && (
                    <button
                      type="button"
                      className="text-gold text-sm hover:underline"
                    >
                      Modifier
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {activeStep === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              placeholder="Votre prénom"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Nom *
                            </label>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              placeholder="Votre nom"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-2">
                            Adresse *
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="123 Rue de la Mode"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Ville *
                            </label>
                            <input
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                              placeholder="Paris"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Code postal *
                            </label>
                            <input
                              type="text"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              required
                              placeholder="75001"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => canContinue() && setActiveStep(3)}
                          disabled={!canContinue()}
                          className="w-full py-3 bg-gold text-background font-semibold rounded-xl hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Continuer <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 3: Payment */}
              <div
                className={`bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden transition-all ${
                  activeStep === 3 ? "ring-2 ring-gold/30" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-between p-5 ${
                    activeStep >= 3
                      ? "cursor-pointer hover:bg-card/60"
                      : "opacity-50"
                  } transition-colors`}
                  onClick={() => activeStep >= 3 && setActiveStep(3)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activeStep >= 3
                          ? "bg-gold text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Paiement</h3>
                  </div>
                </div>

                <AnimatePresence>
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-5">
                        {/* Credit Card Preview */}
                        <div
                          className="relative w-full max-w-sm mx-auto aspect-[1.6/1] cursor-pointer"
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          style={{ perspective: "1000px" }}
                        >
                          <div
                            className="relative w-full h-full transition-transform duration-500"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: isCardFlipped
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            }}
                          >
                            {/* Front */}
                            <div
                              className="absolute inset-0 rounded-2xl p-5 text-white"
                              style={{
                                backfaceVisibility: "hidden",
                                background: `linear-gradient(135deg, ${
                                  getCardType().color
                                } 0%, #1a1a2e 60%, ${
                                  getCardType().color
                                }80 100%)`,
                              }}
                            >
                              <div className="flex justify-between items-start mb-8">
                                <div className="w-12 h-9 rounded bg-gradient-to-br from-amber-200 to-amber-400" />
                                <span className="text-xs font-bold opacity-80">
                                  {getCardType().name}
                                </span>
                              </div>
                              <p className="text-lg md:text-xl font-mono tracking-widest mb-6 opacity-90">
                                {displayCardNumber}
                              </p>
                              <div className="flex justify-between text-xs">
                                <div>
                                  <p className="opacity-50 mb-1">TITULAIRE</p>
                                  <p className="uppercase tracking-wider">
                                    {cardName || "VOTRE NOM"}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="opacity-50 mb-1">EXPIRE</p>
                                  <p>{cardExpiry || "MM/AA"}</p>
                                </div>
                              </div>
                            </div>
                            {/* Back */}
                            <div
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                background: `linear-gradient(135deg, #1a1a2e 0%, ${
                                  getCardType().color
                                }60 100%)`,
                              }}
                            >
                              <div className="h-10 bg-black/80 mt-6" />
                              <div className="p-5">
                                <div className="bg-white/90 h-10 rounded flex items-center justify-end px-4">
                                  <span className="font-mono text-gray-800">
                                    {cardCvv || "•••"}
                                  </span>
                                </div>
                                <p className="text-[10px] text-white/50 mt-2 text-right">
                                  CVV
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-xs text-muted-foreground">
                          Cliquez pour retourner la carte
                        </p>

                        {/* Card Inputs */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Nom sur la carte *
                            </label>
                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) =>
                                setCardName(e.target.value.toUpperCase())
                              }
                              onFocus={() => setIsCardFlipped(false)}
                              required
                              placeholder="NOM PRÉNOM"
                              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground uppercase"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-muted-foreground mb-2">
                              Numéro de carte *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) =>
                                  handleCardNumberChange(e.target.value)
                                }
                                onFocus={() => setIsCardFlipped(false)}
                                required
                                inputMode="numeric"
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 pr-12 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                              />
                              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-muted-foreground mb-2">
                                Expiration *
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) =>
                                  handleExpiryChange(e.target.value)
                                }
                                onFocus={() => setIsCardFlipped(false)}
                                required
                                inputMode="numeric"
                                placeholder="MM/AA"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-muted-foreground mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                value={cardCvv}
                                onChange={(e) =>
                                  handleCvvChange(e.target.value)
                                }
                                onFocus={() => setIsCardFlipped(true)}
                                onBlur={() => setIsCardFlipped(false)}
                                required
                                inputMode="numeric"
                                placeholder="123"
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="w-full py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-background font-bold tracking-wider rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                              Traitement en cours...
                            </>
                          ) : (
                            <>
                              <Lock className="w-5 h-5" />
                              Payer {formatPrice(totalPrice + 50)}
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                          <Lock className="w-3 h-3" />
                          Paiement 100% sécurisé et chiffré
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          {/* Order Summary - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl border border-border/50 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-gold" />
                Récapitulatif ({items.length} article
                {items.length > 1 ? "s" : ""})
              </h3>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-auto mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3 p-2 rounded-xl bg-background/30"
                  >
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-background text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-gold font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 py-4 border-t border-border/50">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Livraison express</span>
                  <span>{formatPrice(50)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-foreground pt-4 border-t border-gold/30">
                <span>Total</span>
                <span className="text-gold">
                  {formatPrice(totalPrice + 50)}
                </span>
              </div>

              {/* Perks */}
              <div className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/20">
                <p className="text-xs text-gold tracking-wider uppercase font-medium mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Privilèges ZIVARA
                </p>
                <div className="space-y-2">
                  {[
                    { icon: Truck, text: "Livraison express offerte" },
                    { icon: Gift, text: "Emballage cadeau luxe" },
                    { icon: Shield, text: "Garantie 5 ans" },
                  ].map((perk) => (
                    <div
                      key={perk.text}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <perk.icon className="w-4 h-4 text-gold" />
                      <span>{perk.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
