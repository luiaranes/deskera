var wh;
(function (wh) {
    var snapshot;
    (function (snapshot) {
        var Fields = {
            key: "wh.reg",
            titleMs: 'title_ms',
            titleMr: 'title_mr',
            firstName: 'input-firstName',
            lastName: 'input-lastName',
            bDay: 'birthdateselectorday',
            bMonth: 'birthdateselectormonth',
            bYear: 'birthdateselectoryear',
            email: 'Email',
            mobile: 'input-mobileNumber',
            address1: 'input-address1',
            addressLookup: 'inputLookupAddress',
            townCity: 'input-townOrCity',
            postCode: 'input-postCodeOrZip',
            stateTerritory: 'stateterritoryselector',
            country: 'input-country',
            username: 'input-username',
        };
        var RegSnapshot = (function () {
            function RegSnapshot() {
                this.user = {};
                this.map = {};
                this.initMap();
            }
            RegSnapshot.prototype.run = function () {
                this.retrieve();
                this.hookup();
            };
            RegSnapshot.prototype.save = function () {
                var enc = this.btoa(JSON.stringify(this.user));
                wh.store.set(Fields.key, enc);
            };
            RegSnapshot.prototype.get = function () {
                try {
                    var enc = this.atob(wh.store.get(Fields.key) || '');
                    var user = enc ? JSON.parse(enc) : {};
                    return user;
                }
                catch (e) {
                    console.error(e);
                }
                return {};
            };
            RegSnapshot.prototype.remove = function () {
                wh.store.remove(Fields.key);
            };
            RegSnapshot.prototype.fromVm = function (user) {
                this.user = user;
                this.save();
            };
            RegSnapshot.prototype.initMap = function () {
                var _this = this;
                this.map[Fields.titleMs] = { s: function (v) { return _this.user.title = v; }, g: function () { return _this.user.title; } };
                this.map[Fields.titleMr] = { s: function (v) { return _this.user.title = v; }, g: function () { return _this.user.title; } };
                this.map[Fields.firstName] = { s: function (v) { return _this.user.firstName = v; }, g: function () { return _this.user.firstName; } };
                this.map[Fields.lastName] = { s: function (v) { return _this.user.surname = v; }, g: function () { return _this.user.surname; } };
                this.map[Fields.bDay] = { s: function (v) { return _this.user.birthdateselectorday = v; }, g: function () { return _this.user.birthdateselectorday; } };
                this.map[Fields.bMonth] = { s: function (v) { return _this.user.birthdateselectormonth = v; }, g: function () { return _this.user.birthdateselectormonth; } };
                this.map[Fields.bYear] = { s: function (v) { return _this.user.birthdateSelectorYear = v; }, g: function () { return _this.user.birthdateSelectorYear; } };
                this.map[Fields.email] = { s: function (v) { return _this.user.email = v; }, g: function () { return _this.user.email; } };
                this.map[Fields.mobile] = { s: function (v) { return _this.user.mobile = v; }, g: function () { return _this.user.mobile; } };
                this.map[Fields.address1] = { s: function (v) { return _this.user.address1 = v; }, g: function () { return _this.user.address1; } };
                this.map[Fields.addressLookup] = { s: function (v) { return _this.user.address1 = v; }, g: function () { return _this.user.address1; } };
                this.map[Fields.townCity] = { s: function (v) { return _this.user.townCity = v; }, g: function () { return _this.user.townCity; } };
                this.map[Fields.postCode] = { s: function (v) { return _this.user.postCode = v; }, g: function () { return _this.user.postCode; } };
                this.map[Fields.stateTerritory] = { s: function (v) { return _this.user.stateTerritory = v; }, g: function () { return _this.user.stateTerritory; } };
                this.map[Fields.country] = { s: function (v) { return _this.user.country = v; }, g: function () { return _this.user.country; } };
            };
            RegSnapshot.prototype.hookup = function () {
                var _this = this;
                var $form = $(".js-signup-form");
                $form.find('input, select').on('blur', function (ev) {
                    var $e = $(ev.delegateTarget);
                    var data = { id: $e.attr('id'), val: $e.val() };
                    if (_this.map[data.id]) {
                        _this.map[data.id].s(data.val);
                    }
                    _this.save();
                });
                $('a[data-link-id="close"]').mousedown(function (ev) {
                    _this.snapShot();
                    ev.preventDefault();
                    return false;
                });
            };
            RegSnapshot.prototype.snapShot = function () {
                var _this = this;
                this.eachField(this.map, function (_, v) {
                    var $e = $(".js-signup-form #" + v);
                    var setter = _this.map[v].s;
                    if ($e.is(':radio')) {
                        if ($e.is(':checked')) {
                            setter($e.val());
                        }
                    }
                    else {
                        setter($e.val());
                    }
                });
                this.save();
            };
            RegSnapshot.prototype.retrieve = function () {
                var _this = this;
                this.user = this.get();
                this.eachField(this.map, function (_, k) {
                    var $e = $(".js-signup-form #" + k);
                    var val = _this.map[k].g();
                    if ($e.is(':radio')) {
                        if ($e.val() === val) {
                            $e.attr('checked', 1);
                        }
                    }
                    else {
                        $e.val(val);
                    }
                });
            };
            RegSnapshot.prototype.eachField = function (map, f) {
                $.each(Fields, function (k, v) {
                    if (map[v]) {
                        f(k, v);
                    }
                });
            };
            RegSnapshot.prototype.atob = function (inp) {
                return window.atob ? window.atob(inp) : inp;
            };
            RegSnapshot.prototype.btoa = function (inp) {
                return window.btoa ? window.btoa(inp) : inp;
            };
            return RegSnapshot;
        })();
        snapshot.RegSnapshot = RegSnapshot;
    })(snapshot = wh.snapshot || (wh.snapshot = {}));
})(wh || (wh = {}));
