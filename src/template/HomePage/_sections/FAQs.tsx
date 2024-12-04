'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";
import { FAQs } from "@/constants";
import { FAQ } from "@/types";

const FAQSection = () => {
  return (
    <section className="w-full py-12 px-4">
      <h2 className="text-6xl font-bold text-center mb-8">FAQ</h2>
      
      <div className="flex w-full">
        <div className="w-1/2">
            <h3 className="text-4xl font-bold">Frequency Asked <br />Questions</h3>
        </div>
        <div className="w-1/2">
            <Accordion>
            {FAQs.map((faq: FAQ, index: number) => (
            <AccordionItem
                key={index}
                aria-label={faq.question}
                title={faq.question}
            >
                {faq.answer}
            </AccordionItem>
            ))}
        </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
