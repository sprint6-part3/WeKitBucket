import TurndownService from "turndown";

// TurndownService 인스턴스 생성
const turndownService = new TurndownService();

// 색상 규칙 추가
turndownService.addRule("color", {
  filter(node) {
    return node.nodeName === "SPAN" && (node as HTMLElement).style.color !== "";
  },
  replacement(content, node) {
    const { color } = (node as HTMLElement).style;
    return `{color:${color}}${content}{/color}`;
  },
});

// 정렬 규칙 추가
turndownService.addRule("align", {
  filter(node) {
    return node.nodeName === "DIV" && (node as HTMLElement).style.textAlign !== "";
  },
  replacement(content, node) {
    const { textAlign } = (node as HTMLElement).style;
    return `{align:${textAlign}}${content}{/align}`;
  },
});

// 밑줄 규칙 추가
turndownService.addRule("underline", {
  filter: "u",
  replacement(content) {
    return `__${content}__`;
  },
});

export default turndownService;
