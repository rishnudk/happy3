"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalBackground } from "@/components/sections/GlobalBackground";
import PageWrapper from "@/components/layout/page-wrapper";

// Modular Community Component imports
import CommunityHero from "@/components/community/CommunityHero";
import CommunityMarquee from "@/components/community/CommunityMarquee";
import UpcomingEvents from "@/components/community/UpcomingEvents";
import WhatsAppCallout from "@/components/community/WhatsAppCallout";

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Cinematic Ambient Background */}
      <GlobalBackground />

      {/* Header Menu Navigation */}
      <Navbar />

      <PageWrapper className="pt-32 pb-24 relative z-10">
        
        {/* ─── Hero Heading Banner ─── */}
        <CommunityHero />

        {/* ─── Scrolling Photo Marquees ─── */}
        <CommunityMarquee />

        {/* ─── Upcoming Events Grid Dashboard ─── */}
        <UpcomingEvents />

        {/* ─── High-Priority WhatsApp Callout Banner ─── */}
        <WhatsAppCallout />

      </PageWrapper>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
