import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const qrCard = await prisma.qrCard.findUnique({
      where: { slug },
      include: {
        customer: {
          include: {
            socialLinks: true,
          },
        },
      },
    });

    if (!qrCard || !qrCard.customer || qrCard.status !== "ACTIVE") {
      return new NextResponse("Card not found or inactive", { status: 404 });
    }

    const { customer } = qrCard;

    // Build standard RFC vCard 3.0
    const vcardLines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${customer.name}`,
    ];

    const nameParts = customer.name.split(" ");
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    const firstName = nameParts[0] || "";
    vcardLines.push(`N:${lastName};${firstName};;;`);

    if (customer.company) {
      vcardLines.push(`ORG:${customer.company}`);
    }

    if (customer.jobTitle) {
      vcardLines.push(`TITLE:${customer.jobTitle}`);
    }

    if (customer.phone) {
      vcardLines.push(`TEL;TYPE=CELL,VOICE:${customer.phone}`);
    }

    if (customer.email) {
      vcardLines.push(`EMAIL;TYPE=PREF,INTERNET:${customer.email}`);
    }

    if (customer.website) {
      vcardLines.push(`URL:${customer.website}`);
    }

    if (customer.address) {
      vcardLines.push(`ADR;TYPE=WORK:;;${customer.address};;;;`);
    }

    if (customer.bio) {
      vcardLines.push(`NOTE:${customer.bio.replace(/\n/g, "\\n")}`);
    }

    for (const social of customer.socialLinks) {
      if (social.url) {
        vcardLines.push(`X-SOCIALPROFILE;TYPE=${social.platform}:${social.url}`);
      }
    }

    vcardLines.push("END:VCARD");
    const vcardData = vcardLines.join("\r\n");

    const safeFilename = encodeURIComponent(
      customer.name.replace(/[^a-zA-Z0-9_\-]/g, "_")
    );

    return new NextResponse(vcardData, {
      status: 200,
      headers: {
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": `attachment; filename="${safeFilename || "contact"}.vcf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("vCard generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
