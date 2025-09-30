# Claude Code Workflow for BrainThrive Medical Website

## Medical Website Review and Implementation Workflow

This document describes the established workflow for continuously improving the BrainThrive medical website using Claude Code's specialized agents.

### Workflow Overview

1. **Medical UX Review** → 2. **Implementation** → 3. **Verification**

---

## Step 1: Medical UX Design Review

### Command
```
Have the medical-ux-designer use playwright to review the current website and suggest updates
```

### What This Does
- The `medical-ux-designer` agent uses Playwright to navigate and screenshot the website
- Provides comprehensive analysis focused on medical service websites
- Reviews accessibility compliance (WCAG 2.1 AA standards)
- Evaluates medical credibility indicators
- Assesses patient journey and trust-building elements
- Identifies mobile responsiveness issues

### Expected Output
- Detailed UX/UI analysis report
- Prioritized recommendations (Phase 1-4)
- Specific technical requirements
- Medical industry compliance gaps

---

## Step 2: Next.js Implementation

### Command
```
use the nextjs-tailwind-engineer agent to implement these changes
```

### What This Does
- The `nextjs-tailwind-engineer` agent implements the recommended changes
- Follows Next.js 14 best practices
- Uses Tailwind CSS utility classes
- Maintains semantic HTML for accessibility
- Ensures medical website compliance standards
- Preserves existing branding

### Key Implementation Areas
- **Accessibility**: WCAG compliance, focus indicators, alt text
- **Medical Credibility**: Credentials, HIPAA compliance, certifications
- **UX Improvements**: Typography, mobile responsiveness, patient journey
- **Performance**: Optimized code, removed duplication

---

## Step 3: Verification

### Commands to Run
```bash
npm run build    # Verify build success
npm run lint     # Check code quality
npm run dev      # Test in development
```

---

## Medical Website Standards Checklist

### ✅ Accessibility Compliance
- [ ] WCAG 2.1 AA contrast ratios (4.5:1 minimum)
- [ ] Keyboard navigation with focus indicators
- [ ] Screen reader compatibility
- [ ] Alt text for all images
- [ ] Skip navigation links

### ✅ Medical Credibility
- [ ] Professional credentials displayed
- [ ] Medical certifications visible
- [ ] HIPAA compliance statements
- [ ] Emergency contact prominence
- [ ] Patient privacy protection

### ✅ User Experience
- [ ] Clear typography hierarchy
- [ ] Mobile-responsive design
- [ ] Optimized patient journey
- [ ] Trust-building elements
- [ ] Performance optimization

---

## Continuous Improvement Process

### Regular Review Schedule
- **Weekly**: Quick accessibility scan
- **Monthly**: Full medical UX review
- **Quarterly**: Comprehensive compliance audit

### When to Trigger Review
- After major content updates
- Before marketing campaigns
- Following user feedback
- After accessibility regulations change

### Example Review Triggers
```
# After adding new services
Have the medical-ux-designer review the new services page and suggest improvements

# Before launching marketing campaign
Have the medical-ux-designer do a comprehensive review focusing on conversion optimization

# After user feedback about accessibility
Have the medical-ux-designer focus on accessibility compliance and suggest fixes
```

---

## Agent Specializations

### Medical-UX-Designer Agent
- **Focus**: Medical service website design
- **Tools**: Playwright browser automation
- **Expertise**: Healthcare UX, accessibility, medical compliance
- **Output**: Design analysis and recommendations

### NextJS-Tailwind-Engineer Agent
- **Focus**: Next.js and Tailwind CSS development
- **Tools**: Code analysis and modification
- **Expertise**: React development, responsive design, performance
- **Output**: Production-ready code implementations

---

## Best Practices

### For Medical Websites
1. **Always prioritize accessibility** - Medical websites must be inclusive
2. **Display credentials prominently** - Build patient trust immediately
3. **Make emergency contact obvious** - Patient safety is paramount
4. **Ensure HIPAA compliance** - Legal requirement for medical practices
5. **Optimize for mobile** - Many patients browse on mobile devices

### For Implementation
1. **Review current code first** - Understand existing patterns
2. **Follow existing conventions** - Maintain code consistency
3. **Test accessibility thoroughly** - Use automated and manual testing
4. **Verify medical compliance** - Double-check regulatory requirements
5. **Maintain performance** - Healthcare sites need fast loading

---

## Example Workflow Execution

```bash
# Step 1: Get medical UX review
Have the medical-ux-designer use playwright to review the current website and suggest updates

# Step 2: Implement recommendations
use the nextjs-tailwind-engineer agent to implement these changes

# Step 3: Verify implementation
npm run build
npm run lint
npm run dev
```

This workflow ensures consistent, high-quality improvements to the medical website while maintaining compliance with healthcare industry standards.