export const stripMarkdown = (markdown: string) => {
  return (
    markdown
      // 헤더 제거
      .replace(/^\s{0,3}(#{1,6})\s+(.*)/gm, '$2')
      // 리스트 항목 제거
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // 인라인 코드 제거
      .replace(/`([^`]+)`/g, '$1')
      // 블록 코드 제거
      .replace(/```[\s\S]*?```/g, '')
      // 인용 블록 제거
      .replace(/^\s*>+\s+/gm, '')
      // 링크와 이미지 제거
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // 강조 제거 (굵게, 기울임)
      .replace(/(\*{1,3})([^*]+)\1/g, '$2')
      .replace(/(_{1,3})([^_]+)\1/g, '$2')
      // 취소선 제거
      .replace(/~~([^~]+)~~/g, '$1')
      // 수평선 제거
      .replace(/^\s*([-*_]){3,}\s*$/gm, '')
      // HTML 태그 제거
      .replace(/<[^>]+>/g, '')
      // 한 줄의 맨 앞에 있는 ^ 제거
      .replace(/^\^+/gm, '')
      // 남아있는 잉여 공백 제거
      .replace(/^\s+|\s+$/g, '')
      .replace(/\s+/g, ' ')
  );
};
