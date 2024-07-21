\renewcommand{\eval}{\Sexpr[stage=render,results=rd]{pak:::#1}}
\renewcommand{\evalatinstall}{\Sexpr[stage=install,results=rd]{pak:::#1}}
\renewcommand{\evaltop}{\Sexpr[stage=render,results=rd]{pak:::#1}}
\renewcommand{\evalatinstalltop}{\Sexpr[stage=install,results=rd]{pak:::#1}}
