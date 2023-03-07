matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);

lightThemeIcon = document.querySelector('link#light-scheme-icon');
darkThemeIcon = document.querySelector('link#dark-scheme-icon');

function onUpdate()
{
  if (matcher.matches)
  {
    lightThemeIcon.remove();
    document.head.append(darkThemeIcon);
  }

  else
  {
    document.head.append(lightThemeIcon);
    darkThemeIcon.remove();
  }
}

onUpdate();
