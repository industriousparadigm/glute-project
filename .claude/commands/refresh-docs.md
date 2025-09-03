# Refresh Documentation Command

Comprehensively update README.md and CLAUDE.md based on current best practices and codebase state.

## Process

1. **Update README.md** (User-facing)
   - Clear quick start section
   - Comprehensive feature list
   - Tech stack with badges
   - Environment setup instructions
   - Testing and deployment guides
   - Professional tone, well-organized

2. **Update CLAUDE.md** (AI Context)
   - **Token-efficient**: Bullet points, not paragraphs
   - **Declarative style**: "You're writing for Claude, not onboarding a junior dev"
   - **Essential content only**:
     - One-line project summary
     - Critical commands
     - Code style rules
     - Key patterns with code snippets
     - Common tasks
     - Current state/limitations
     - Anti-patterns to avoid
   - **Target**: ~150 lines max

## Best Practices

### README.md Structure
1. Title with brief description
2. Badges (tech stack, build status, license)
3. Quick Start (install, run, build, test)
4. Features (bullet points)
5. Tech Stack
6. Configuration (env vars, database)
7. Testing
8. Deployment
9. Contributing
10. License

### CLAUDE.md Structure
1. Project context (1-2 lines)
2. Critical commands
3. Code style rules
4. File structure (essential only)
5. Key patterns (DB, styling, images, etc.)
6. Admin/env setup
7. Common tasks
8. Current state
9. Anti-patterns

## Key Principles

- **README**: Professional, comprehensive, user-friendly
- **CLAUDE.md**: Concise, token-efficient, action-oriented
- Both must be accurate and reflect current codebase state
- Test build after updates to ensure accuracy
- Commit with descriptive message explaining changes

## Example Commit Message

```
docs: update README and CLAUDE.md to reflect current state

- README.md: [specific changes made]
- CLAUDE.md: [specific optimizations]
- Both files now accurately reflect [current features/state]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```