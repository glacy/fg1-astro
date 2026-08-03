import { visit } from 'unist-util-visit';

/**
 * Custom remark plugin to fix MDX + LaTeX brace conflicts
 * Temporarily escapes LaTeX braces that are within math delimiters
 */
export function remarkMdxMathBraceFix() {
  return (tree) => {
    // Pass 1: Find and protect LaTeX commands inside math delimiters
    visit(tree, (node) => {
      if (node.type === 'inlineMath' || node.type === 'math') {
        // For math nodes, we need to escape braces in the data directly
        if (node.data && node.data.value) {
          node.data.value = node.data.value.replace(/\\(\w+)\{([^}]*)\}/g, (_match, cmd, content) => {
            return `\\${cmd}🎗️${content}🏷️`;
          });
        }
      }
      if (node.type === 'text') {
        // Replace LaTeX command braces within inline math ($...$)
        node.value = node.value.replace(/\$([^$]+)\$/g, (_match, mathContent) => {
          const safeContent = mathContent.replace(/\\(\w+)\{([^}]*)\}/g, (_m, cmd, content) => {
            return `\\${cmd}🎗️${content}🏷️`;
          });
          return `$${safeContent}$`;
        });
        
        // Replace LaTeX command braces within display math ($$...$$)
        node.value = node.value.replace(/\$\$([^$]+)\$\$/g, (_match, mathContent) => {
          const safeContent = mathContent.replace(/\\(\w+)\{([^}]*)\}/g, (_m, cmd, content) => {
            return `\\${cmd}🎗️${content}🏷️`;
          });
          return `$$${safeContent}$$`;
        });
      }
    });

    // Pass 2: Restore LaTeX braces after math processing
    visit(tree, (node) => {
      if (node.type === 'inlineMath' || node.type === 'math') {
        if (node.data && node.data.value) {
          node.data.value = node.data.value
            .replace(/🎗️/g, '{')
            .replace(/🏷️/g, '}');
        }
      }
      if (node.type === 'text') {
        node.value = node.value
          .replace(/🎗️/g, '{')
          .replace(/🏷️/g, '}');
      }
    });
  };
}