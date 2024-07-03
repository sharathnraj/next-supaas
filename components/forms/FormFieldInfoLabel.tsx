import React from 'react';

export default function FormFieldInfoLabel({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <label className="text-textSubtle">{children}</label>;
}
