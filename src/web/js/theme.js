(function () {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = null;
  const switchTheme = (mq) => {
    if (currentTheme !== null) { currentTheme.remove(); }
    currentTheme = document.createElement('link');
    currentTheme.setAttribute('rel', 'stylesheet');
    currentTheme.setAttribute('href', `https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/${mq.matches ? 'superhero' : 'yeti'}/bootstrap.min.css`);
    document.getElementsByTagName('head')[0].appendChild(currentTheme);
  };
  mediaQuery.addListener(switchTheme);
  switchTheme(mediaQuery);
})();
