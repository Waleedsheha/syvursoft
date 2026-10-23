"use client";

import type { ReactNode } from "react";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";

/* Gives client components the page's messages. A missing message is a gap in the copy, so it throws here too instead of
   showing the key path in its place. */
export default function ClientIntlProvider({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  timeZone: string;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      onError={(error) => {
        throw error;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
