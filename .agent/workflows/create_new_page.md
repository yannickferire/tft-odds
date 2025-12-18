---
description: How to create a new page in the application with correct metadata and structure.
---

Follow these steps to create a new page in the application. This ensures consistency in SEO handling, layout, and code style.

## 1. Define Page Metadata
First, add the page title and description to the central metadata configuration.

**File**: `src/config/page-metadata.ts`

```typescript
// Add a new entry to the PAGE_METADATA object
export const PAGE_METADATA: Record<string, PageMetadata> = {
  // ... existing entries
  '/your-new-page-route': {
    title: 'Your Page Title',
    description: 'A concise description for SEO purposes.',
  },
};
```

## 2. Create the Page Component
Create a new file in the `src/pages` directory satisfying your route requirements.

**File**: `src/pages/your-new-page-route.tsx`

Use the following template to ensure the page is "clean" and properly integrated:

```tsx
import { type NextPage } from "next";
import { NextSeo } from 'next-seo';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

const NewPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`TFT Set ${currentSet} New Page`}
        description={`View all chances for Opening Encounter odds for TFT Set ${currentSet}. Discover spawn rates, rewards and champions for each Set ${currentSet} encounter to optimize your early game strategy.`}
        canonical="https://tftodds.com/NewPage"
        openGraph={{
          url: 'https://tftodds.com/NewPage',
          title: `TFT Set ${currentSet} Encounters - Opening Odds & Rewards`,
          description: `View all chances for Opening Encounter odds for TFT Set ${currentSet}. Discover spawn rates, rewards and champions for each Set ${currentSet} encounter to optimize your early game strategy.`,
          images: [
            {
              url: 'https://tftodds.com/share.jpg',
              alt: 'TFT Odds Share Image',
            },
          ],
        }}
      />
      <h1 className="text-3xl mt-4 mb-6 font-bold px-4 text-center tracking-wide"><strong className="text-morning">New Page</strong></h1>
      <article className="flex flex-col text-sm max-w-2xl mx-auto mb-12 px-4 gap-2">
        <p>Intro text description for SEO purpose
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="ml-2">More info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-scroll max-h-[90vh]">
              <AlertDialogHeader>
                <AlertDialogTitle>Introduction</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>Generic introduction text about this tool/page.</p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Section 1 Title</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                  <p>1. <strong>Point 1:</strong> <br />
                    Explanation...
                  </p>
                  <p>2. <strong>Point 2:</strong><br />
                    Explanation...
                  </p>
                </AlertDialogDescription>
                <hr className="opacity-30" />
                <AlertDialogTitle>Conclusion</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2">
                   <p>Conclusion text...</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="absolute right-2 top-2">
                <AlertDialogCancel className="px-1 py-0.5"><X className="w-6 h-6" /></AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </p>
      </article>
    </>
  )
}

export default NewPage;
```

## 3. Add to Navigation
Finally, add the new page to the navigation menu so users can find it.

**File**: `src/config/navigation.ts`

```typescript
// Add your new item to the navigationConfig array
export const navigationConfig: NavigationItem[] = [
  // ...
  { // Example of adding a detailed pages
    label: 'Augments',
    href: '/augments',
    children: [
       // ... existing items
       {
        label: 'New Page',
        href: '/augments/your-new-page-route',
       }
    ]
  },
  // OR as a top level item
  {
    label: 'New Page',
    href: '/your-new-page-route',
  },
];
```

## 4. (Optional) Verify
- Run `npm run dev`
- Visit `http://localhost:3000/your-new-page-route`
- Check that the title in the browser tab matches your metadata.
- Check that the page structure looks correct within the layout.
- Check that the link appears in the navigation menu.