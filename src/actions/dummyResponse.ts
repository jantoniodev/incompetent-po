export const dummyResponse = [
    {
        "id": 1,
        "title": "Generación de historias de usuario con IA",
        "story": "Como Product Owner, quiero generar historias de usuario utilizando IA, para optimizar el proceso de creación y asegurar consistencia en la documentación.",
        "description": "El sistema debe permitir a los Product Owners ingresar requisitos básicos y obtener historias de usuario generadas automáticamente que sigan un formato estándar.",
        "acceptanceCriteria": {
            "business": [
                "El sistema debe permitir la entrada de datos básicos sobre el requisito del software.",
                "El sistema debe generar historias de usuario consistentes y bien formateadas.",
                "El sistema debe mejorar la eficiencia del Product Owner en la creación de historias de usuario."
            ],
            "technical": [
                "El sistema debe utilizar un modelo de IA para la generación de texto.",
                "La generación de historias de usuario debe completarse en menos de 5 segundos.",
                "El sistema debe proporcionar una interfaz de usuario intuitiva y fácil de usar."
            ]
        }
    },
    {
        "id": 2,
        "title": "Edición de historias de usuario generadas",
        "story": "Como Product Owner, quiero editar historias de usuario generadas por IA, para personalizarlas según necesidades específicas del proyecto.",
        "description": "El sistema debe permitir que los Product Owners puedan revisar y modificar las historias de usuario generadas por la IA antes de su aprobación y uso en el backlog.",
        "acceptanceCriteria": {
            "business": [
                "El sistema debe permitir la edición de cualquier parte de la historia de usuario generada.",
                "El sistema debe guardar un historial de cambios para la trazabilidad.",
                "El sistema debe permitir la aprobación final de la historia de usuario antes de su uso."
            ],
            "technical": [
                "El sistema debe guardar los cambios en tiempo real sin pérdida de datos.",
                "El sistema debe permitir la edición mediante una interfaz de usuario WYSIWYG (What You See Is What You Get).",
                "El sistema debe ser capaz de revertir a versiones anteriores de una historia de usuario."
            ]
        }
    },
    {
        "id": 3,
        "title": "Exportación de historias de usuario",
        "story": "Como Product Owner, quiero exportar las historias de usuario a diferentes formatos, para integrarlas con otras herramientas de gestión de proyectos.",
        "description": "El sistema debe proporcionar la funcionalidad para exportar las historias de usuario generadas en formatos comunes como PDF, Word y JSON.",
        "acceptanceCriteria": {
            "business": [
                "El sistema debe permitir la exportación de historias de usuario en múltiples formatos.",
                "El sistema debe mantener el formato y la estructura durante la exportación.",
                "El sistema debe permitir la exportación de una o varias historias de usuario a la vez."
            ],
            "technical": [
                "El sistema debe ser capaz de exportar las historias de usuario en menos de 3 segundos.",
                "El sistema debe proporcionar opciones de exportación desde la interfaz de usuario.",
                "El sistema debe garantizar la seguridad y privacidad de los datos durante el proceso de exportación."
            ]
        }
    }
]
