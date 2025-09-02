# Micromatic

La problemática actual es acerca del tiempo el cual tarda en llegar el transporte 
público a cada paradero en la ciudad de Temuco, por el cual el objetivo será 
implementar un simulador del recorrido que hacen los microbuses para dar a conocer 
a la gente un aproximado de dónde pueden estar los buses urbanos en tiempo real.

Este proyecto tendrá muchas bases por el cuál será desarrollado, dentro de las 
tecnologías principales se encuentran React el cual se encargará de maquetar las 
interfaces de usuario de una forma interactiva y sencilla, con esto lograremos diseñar 
vistas simples para cada estado de la página, y además se encargará de actualizar y 
renderizar de manera eficiente los componentes correctos cuando los datos cambien. 

MongoDB por otra parte será nuestra base de datos NoSQL que se encargará de 
almacenar los datos estadísticos de la página de forma que podamos tener datos de 
las posiciones, rutas, entre otros. Y por último Python que usaremos como API rest 
usando Flask y para hacer los cálculos pertinentes a las posiciones de los vehículos y 
las estadísticas generales de la aplicación.

## Autores

**Cristian Angulo-Gonzalez**
**Claudio Araya-Toro**
**Diego Castro-Cifuentes**

## Modo de uso

- Importar archivos XX_ida.json e XX_regreso.json en la bd de mongo servicio/rutas que estan en "inten/src".

- Iniciar app.py y simulador.py que estan en "Backend" (previamente instalando las librerias de flask e requests).

- Iniciar node.js con "npm install" (si es primera vez) e "npm init" en la carpeta "inten".