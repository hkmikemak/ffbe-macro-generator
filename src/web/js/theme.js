(function () {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let currentTheme = null;
  const switchTheme = (mq) => {
    if (currentTheme !== null) {
      currentTheme.remove();
    }
    currentTheme = document.createElement("link");
    currentTheme.setAttribute("rel", "stylesheet");
    currentTheme.setAttribute(
      "href",
      `https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.0.0/${
        mq.matches ? "superhero" : "yeti"
      }/bootstrap.min.css`
    );
    document.getElementsByTagName("head")[0].appendChild(currentTheme);
  };
  mediaQuery.addEventListener("change", switchTheme);
  switchTheme(mediaQuery);
})();
