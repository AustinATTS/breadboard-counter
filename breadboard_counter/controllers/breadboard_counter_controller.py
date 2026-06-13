import json
from odoo import http
from odoo.http import request

class Controller(http.Controller):
    @http.route('/breadboard/counter', type='http', auth='public', website=True)
    def get_counter(self):
        return request.render(
            'breadboard_counter.breadboard_counter_page',
            {}
        )