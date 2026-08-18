function convertProps(props: string): string {
  return props
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const idx = p.indexOf(":");
      if (idx < 0) return "";
      const k = p.slice(0, idx).trim();
      const v = p
        .slice(idx + 1)
        .trim()
        .replace(/^(?:&quot;|["'])|(?:&quot;|["'])$/g, "");
      const kebab = k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
      return `${kebab}:${v}`;
    })
    .filter(Boolean)
    .join(";");
}

export function jsxStyleToCss(html: string): string {
  return html
    .replace(
      /&lt;span style=\{\{([^}]+)\}\}&gt;([\s\S]*?)&lt;\/span&gt;/g,
      (_m, props: string, inner: string) => `<span style="${convertProps(props)}">${inner}</span>`,
    )
    .replace(/<span style=\{\{([^}]+)\}\}>/g, (_m, props: string) => `<span style="${convertProps(props)}">`);
}
