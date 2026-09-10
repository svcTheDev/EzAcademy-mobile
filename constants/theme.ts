// constants/theme.ts

export const theme = {
  colors: {
    // Colores extraídos y convertidos directamente de EzAcademy V1 Web
    background: '#38444C',      // --background (210, 15.15%, 25.88%)
    loginBackground: '#212121',
    foreground: '#F8FAFC',      // --foreground (210, 40%, 98%)
    
    card: '#1D2736',            // --card (217, 33%, 17%)
    cardForeground: '#F8FAFC',  // --card-foreground
    
    primary: '#71A8C9',         // --primary (199.31, 44.62%, 61.76%)
    primaryForeground: '#F8FAFC',
    
    secondary: '#253041',       // --secondary (217, 33%, 22%)
    secondaryForeground: '#F8FAFC',
    
    muted: '#1D2736',           // --muted
    mutedForeground: '#94A3B8', // --muted-foreground (215, 20%, 65%)
    
    accent: '#1AD8F2',          // --accent / cyan glow (187, 80%, 50%)
    accentForeground: '#0F172A',
    
    destructive: '#EF4444',     // --destructive (0, 84%, 60%)
    destructiveForeground: '#F8FAFC',
    
    border: '#2A374A',          // --border (217, 33%, 25%)
    input: '#2A374A',           // --input
    ring: '#2EBA77',            // --ring / green (152, 60%, 45%)
    cubeFace: '#212121',
    cubeTop: '#1AD8F2',
    cubeRight: '#1AD8F2',
    cubeInputEdge: 'rgba(255, 255, 255, 0.5)',
    cubeFocus: 'rgba(255, 255, 255, 0.8)',
    cubeGradient: ['rgba(2, 0, 36, 1)', 'rgba(52, 9, 121, 1)', 'rgba(0, 212, 255, 1)'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,                      // Mapeado de --radius: 0.5rem (8px)
    lg: 12,
  },
};