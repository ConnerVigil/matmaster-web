import React from "react";

export default function EventPreview({ params }: { params: { id: string } }) {
  return <div>EventPreview for ID: {params.id}</div>;
}
