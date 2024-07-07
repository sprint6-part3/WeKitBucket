"use client";

/* eslint-disable react/no-danger */
import React from "react";
import { marked } from "marked";
import styles from "@/styles/markdown.module.css";

marked.setOptions({
  gfm: true,
  breaks: true,
});

interface ContentProps {
  content: string | Promise<string>;
}

function Content({ content }: ContentProps) {
  return <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: marked(content as string) }} />;
}

export default Content;
