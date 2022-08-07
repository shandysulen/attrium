import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'orpheuspro', serif`,
  body: `'orpheuspro', serif`,
};

const theme = extendTheme({
  components: {
    Alert: {
      parts: ['container'],
      baseStyle: {
        container: {
          rounded: '10px',
          alignItems: 'flex-start'
        }
      }
    },
    Button: {
      baseStyle: {
        rounded: 'full',
        shadow: 'dark-lg',
        py: '25px',
        position: 'static'
      }
    },
    Checkbox: {
      baseStyle: {
        color: 'emerald',
        _focus: {
          'box-shadow': 'none',
          outline: 'none'
        }
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 400
      }
    },
    Link: {
      baseStyle: {
        background: 'linear-gradient(#A87CFF, #FCD5CD)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        _hover: {
          opacity: 0.7,
          transition: "all 0.2s"
        }
      }
    },
    Menu: {
      parts: ['groupTitle'],
      baseStyle: {
        'groupTitle': {
          fontSize: '12px',
          color: 'gray.300',
          margin: '8px 12px'
        }
      }
    },
    Select: {
      parts: ['field'],
      baseStyle: {
        'field': {
          cursor: 'pointer'
        }
      }
    },
    Spinner: {
      baseStyle: {
        color: 'emerald',
      },
      defaultProps: {
        size: 'xl'
      }
    },
    Stat: {
      parts: ['container'],
      baseStyle: {
        container: {
          position: 'static',
        }
      }
    },
    Text: {
      baseStyle: {
        fontSize: '16px',
        transition: 'all 0.2s'
      }
    }
  },
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  shadows: {
    'xl-left': 'rgba(0, 0, 0, 0.1) -5px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    'xl-all': `rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px,
               rgba(0, 0, 0, 0.1) 0px -20px 25px -5px, rgba(0, 0, 0, 0.04) 0px -10px 10px -5px`,
    'md-all': `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06),
               0 -2px 6px -1px rgba(0, 0, 0, 0.1), 0 -1px 4px -1px rgba(0, 0, 0, 0.06)`,
    'md-all-dark': `0 4px 6px -1px #6666661a, 0 2px 4px -1px #6666661a,
               0 -2px 6px -1px #6666661a, 0 -1px 4px -1px #6666661a`,
    outline: '0 0 0 3px rgb(80, 200, 120, 0.6)', // emerald focus color
    glow: '0px 0px 20px 5px #50C878;',
    'glow-sm': '0px 0px 6px 5px #50C878;',
  },
});

export default theme;
