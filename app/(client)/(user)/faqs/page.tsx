"use client";

import React from "react";
import Container from "@/components/Container";
import Title from "@/components/Title";
import TopBanner from "@/components/TopBanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqsData } from "@/constant";

export default function Faqspage() {
  return (
    <>
      <TopBanner title="FAQ" />

      <Container className="max-w-4xl sm:px-6 lg:px-8 py-12 h-[80vh]">
        <Title className="text-3xl mt-6">Frequently Asked Questions</Title>

        <Accordion
          type="single"
          collapsible
          className="w-full mt-6 space-y-4"
          defaultValue="item-0"
        >
          {faqsData?.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="group border-b border-gray-200 pb-4"
            >
              <AccordionTrigger className="flex items-center justify-between w-full text-left text-lg font-semibold text-black/80 group-hover:text-black hover:no-underline transition-all">
                <span>{faq.question}</span>
              </AccordionTrigger>

              <AccordionContent className="text-gray-600 mt-2">
                {faq?.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  );
}
