{
    'name': "BreadBoard Counter",
    'version': '0.1.8',
    'category': 'Toasty Software',
    'summary': "OWL Counter",
    'currency': 'EUR',
    'price': 0.00,
    'description': """
BreadBoard Counter
==================

A simple OWL counter that can integrate with the BreadBoard.
    """,
    'website': "https://www.toastysoftware.co.uk",
    'depends': ['web', 'website'],
    'installable': True,
    'application': True,
    'data': [
        'views/breadboard_counter_page_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'breadboard_counter/static/src/components/app/app.js',
            'breadboard_counter/static/src/components/app/app.scss',
            'breadboard_counter/static/src/components/app/app.xml',
        ],
    },
    'images': [],
    'author': "All Things Toasty Software Ltd",
    'maintainer': "All Things Toasty Software Ltd",
    'license': 'OPL-1',
}