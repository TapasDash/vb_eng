'use client';

import * as React from 'react';
import { useVibe } from '@/components/theme-provider';
import { Terminal, Code, CornerDownLeft } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

export function DevFlex() {
  const { vibeLevel } = useVibe();
  const [inputVal, setInputVal] = React.useState('');
  const [terminalHistory, setTerminalHistory] = React.useState<TerminalLine[]>([
    { text: 'Terminal session started.', type: 'output' },
    { text: 'Type "help" for a list of available commands.', type: 'output' },
  ]);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of terminal
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...terminalHistory, { text: `guest@portfolio ~ % ${cmdText}`, type: 'input' as const }];

    switch (trimmed) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  cat skills.json - View my tech stack', type: 'output' },
          { text: '  start-party     - Host a new event', type: 'output' },
          { text: '  check-status    - View current stats', type: 'output' },
          { text: '  clear           - Clear terminal', type: 'output' },
          { text: '  secret          - Classified', type: 'output' }
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setInputVal('');
        return;
      case 'cat skills.json':
        newHistory.push(
          { text: '{', type: 'output' },
          { text: '  "role": "Developer / Automation Engineer",', type: 'output' },
          { text: '  "core_languages": ["TypeScript", "Python", "Bash", "SQL"],', type: 'output' },
          { text: '  "frameworks": ["React", "Next.js", "Node.js", "Express"],', type: 'output' },
          { text: '  "infrastructure": ["OCI", "AWS", "Docker", "Linux"],', type: 'output' },
          { text: '  "focus": ["Workflow Automation", "Full-Stack Dev", "API Dev"]', type: 'output' },
          { text: '}', type: 'output' }
        );
        break;
      case 'start-party':
        newHistory.push(
          { text: 'Finding location... OK', type: 'output' },
          { text: 'Inviting guests... Done', type: 'output' },
          { text: 'Setting up music... Success', type: 'output' },
          { text: 'STATUS: EVENT IS LIVE', type: 'output' }
        );
        break;
      case 'check-status':
        newHistory.push(
          { text: `Current Energy Level: ${vibeLevel}%`, type: 'output' },
          { text: `Power Source: Good music and great people`, type: 'output' },
          { text: `Connections Made: 5,000+`, type: 'output' },
          { text: 'Status: Healthy / Having Fun', type: 'output' }
        );
        break;
      case 'secret':
        newHistory.push(
          { text: 'ACCESS GRANTED.', type: 'output' },
          { text: '🤫 "The quiet guys throw the best parties."', type: 'output' }
        );
        break;
      default:
        newHistory.push({ text: `zsh: command not found: ${trimmed}. Type "help" for instructions.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <section className="w-full bg-secondary/30 px-4 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Code className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            The Day Job
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Web Developer.
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">
              I'm a developer who builds practical systems and automates solutions. I write code to optimize workflows, handle complex integrations, and develop robust applications that handle the heavy lifting for your business.
            </p>

            {/* Quick Command Suggestions */}
            <div className="flex flex-col gap-3 font-mono text-xs select-none">
              <span className="text-muted-foreground font-medium tracking-wide">// Click to run command:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => executeCommand('cat skills.json')}
                  className="bg-card border border-border hover:bg-secondary hover:text-foreground text-muted-foreground py-2 px-4 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  cat skills.json
                </button>
                <button
                  onClick={() => executeCommand('start-party')}
                  className="bg-card border border-border hover:bg-secondary hover:text-foreground text-muted-foreground py-2 px-4 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  start-party
                </button>
                <button
                  onClick={() => executeCommand('check-status')}
                  className="bg-card border border-border hover:bg-secondary hover:text-foreground text-muted-foreground py-2 px-4 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  check-status
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Simulator Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="soft-card overflow-hidden flex flex-col h-96 transition-all duration-300 relative bg-card/95 backdrop-blur-md border border-border/50">
              
              {/* macOS Style Title Bar */}
              <div className="w-full bg-secondary/30 border-b border-border/50 px-4 py-3 flex items-center select-none z-20">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block"></span>
                </div>
                
                <div className="flex-1 text-center flex items-center justify-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground font-medium tracking-wide">guest@portfolio ~ zsh</span>
                </div>
              </div>

              {/* Terminal Logs Display Area */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 p-5 font-mono text-sm overflow-y-auto leading-relaxed z-20 space-y-2 select-text"
              >
                {terminalHistory.map((line, index) => (
                  <div 
                    key={index}
                    className={
                      line.type === 'input' 
                        ? 'text-foreground font-semibold' 
                        : line.type === 'error' 
                        ? 'text-red-500 font-medium' 
                        : 'text-muted-foreground'
                    }
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              {/* Terminal Input Bar */}
              <div className="p-4 border-t border-border/30 bg-secondary/10 flex items-center gap-3 z-20">
                <span className="font-mono text-sm text-primary font-semibold select-none">guest@portfolio ~ %</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-foreground font-mono text-sm border-none outline-none focus:ring-0 p-0 focus:outline-none"
                  placeholder="Type help..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  className="p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
                  title="Execute command"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
