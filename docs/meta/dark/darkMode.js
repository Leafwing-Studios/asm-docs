const plugin = (hook, vm) => {
  var trans = () => {
    document.documentElement.classList.add('transition')
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 210)
  }
	
  var setColor = ({ background, toggleBtnBg, textColor, highlightColor, divider, backgroundAlt }) => {
		var splitBackground = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(background)
		var splitBackground = splitBackground || ['', 'ff', 'ff', 'ff']
		
    document.documentElement.style.setProperty(
      '--docsify_dark_mode_bg',
      background
    )
    document.documentElement.style.setProperty(
      '--docsify_dark_mode_btn',
      toggleBtnBg
    )
    document.documentElement.style.setProperty('--text_color', textColor)
		document.documentElement.style.setProperty('--highlight_color', highlightColor)
		document.documentElement.style.setProperty('--divider_color', divider)
		document.documentElement.style.setProperty('--alternate_background', backgroundAlt)
		document.documentElement.style.setProperty(
			'--docsify_dark_mode_bg_rgb', 
			`${parseInt(splitBackground[1], 16)}, ${parseInt(splitBackground[2], 16)}, ${parseInt(splitBackground[3], 16)}`
		)
  }

  var theme = { dark: {}, light: {} }
  var defaultConfig = {
    dark: {
      background: '#0F151A',
      toggleBtnBg: '#34495e',
			textColor: '#c4c4b8',
			highlightColor: '#d3d3c6',
			divider: '#454555',
			backgroundAlt: '#161F26',
    },
    light: {
      background: 'none',
      toggleBtnBg: 'var(--theme-color)',
      textColor: '#34495e',
			highlightColor: '#2c3e50',
			divider: '#eee',
			backgroundAlt: '#f8f8f8',
    }
  }

  theme = { ...defaultConfig, ...vm.config.darkMode }
	
	hook.mounted(function () {
		var checked = ''
		if (localStorage.getItem('DOCSIFY_DARK_MODE')) {
			currColor = localStorage.getItem('DOCSIFY_DARK_MODE');
			if (currColor === 'dark') checked = 'checked'
		}
		
    var darkEl = ` <div id="dark_mode">
     <input class="container_toggle" type="checkbox" id="switch" name="mode" ${checked} />
     <label for="switch">Toggle</label>
   </div>`
		
		const el = window.Docsify.dom.create('div', darkEl);
		const aside = window.Docsify.dom.find('aside');
		window.Docsify.dom.appendTo(aside, el);
	});

  hook.doneEach(function() {
    var currColor
    if (localStorage.getItem('DOCSIFY_DARK_MODE')) {
      currColor = localStorage.getItem('DOCSIFY_DARK_MODE')
      setColor(theme[`${currColor}`])
    } else {
      currColor = 'light'
      setColor(theme.light)
    }

    var checkbox = document.querySelector('input[name=mode]')
    
    if (!checkbox) {
      return
    }

    checkbox.addEventListener('change', function() {
      // dark
      if (currColor === 'light') {
        trans()
        setColor(theme.dark)
        localStorage.setItem('DOCSIFY_DARK_MODE', 'dark')
        currColor = 'dark'
      } else {
        trans()
        setColor(theme.light)
        localStorage.setItem('DOCSIFY_DARK_MODE', 'light')
        currColor = 'light'
      }
    })
  })
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)
