describe("The ot object has method which help in inheritance", function () {
    describe("a inherit method", function () {
        var objA, objB;
        objA = {
            p1: true
        };
        objB = ot.inherit(objA, {
            p2: true
        });

        it("which allows you to inherit from an object", function () {
            expect(objB.p1).toBe(true);
            expect(objB.hasOwnProperty("p1")).toBe(false);
        });

        it("which allows you to merge an object to the resulting object", function () {
            expect(objB.p2).toBe(true);
            expect(objB.hasOwnProperty("p2")).toBe(true);
        });
    });

    describe("a deepInherit method", function () {
        var objA, objB;
        objA = {
            p1: true,
            p2: {
                p2_1: true,
                p2_2: {
                    p2_2_1: true
                }
            }
        };
        objB = ot.deepInherit(objA, {
            p2: {
                p2_3: true,
                p2_2: {
                    p2_2_2: true
                }
            }
        }, function (obj, superObj, level) {
            obj.level = level;
            if (obj.__proto__) {
                obj.inheritSuper = (obj.__proto__ === superObj);
            } else {
                obj.inheritSuper = true;
                for (var key in superObj) {
                    if (!(key in obj)) {
                        obj.inheritSuper = false;
                    }
                }
            }
        });

        it("which allows you to inherit from an object recursively", function () {
            expect(objB.p1).toBe(true);
            expect(objB.hasOwnProperty("p1")).toBe(false);

            expect(objB.p2.p2_1).toBe(true);
            expect(objB.p2.hasOwnProperty("p2_1")).toBe(false);

            expect(objB.p2.p2_2.p2_2_1).toBe(true);
            expect(objB.p2.p2_2.hasOwnProperty("p2_2_1")).toBe(false);
        });

        it("which allows you to deeply merge an object to the resulting object", function () {
            expect(objB.p2).toBeDefined()
            expect(objB.hasOwnProperty("p2")).toBe(true);

            expect(objB.p2.p2_3).toBe(true);
            expect(objB.p2.hasOwnProperty("p2_3")).toBe(true);

            expect(objB.p2.p2_2.p2_2_2).toBe(true);
            expect(objB.p2.p2_2.hasOwnProperty("p2_2_2")).toBe(true);
        });

        it("which invoke the function you provide it on each level of deep inheritance", function () {
            expect(objB.level).toBe(0);
            expect(objB.p2.level).toBe(1);
            expect(objB.p2.p2_2.level).toBe(2);

            expect(objB.inheritSuper).toBe(true);
            expect(objB.p2.inheritSuper).toBe(true);
            expect(objB.p2.p2_2.inheritSuper).toBe(true);
        });

        it("which doesn't inherit a function if it doesn't have user defined properties", function () {
            var objA = {
                p1: function(){},
                p2: {
                    p3: function(){}
                }
            };

            var objB = ot.deepInherit(objA);
            expect(objB.hasOwnProperty("p1")).toBe(false);
            expect(objB.p2.hasOwnProperty("p3")).toBe(false);

            objA.p1.prop = true;
            objA.p2.p3.prop = true;

            var objC = ot.deepInherit(objA);
            expect(objC.hasOwnProperty("p1")).toBe(true);
            expect(objC.p2.hasOwnProperty("p3")).toBe(true);
        });
    });



    describe("a boundInherit method", function () {
        var objA, objB;
        objA = {
            p1: true,
            p2: {
                p2_1: true,
                p2_2: {
                    p2_2_1: true
                }
            }
        };
        objB = ot.boundInherit(objA);

        it("which updates bound-inherited children when the parent has a new object", function () {
            ot.navigate.set(objA, "p2.p2_2.p2_2_2", true);
            ot.navigate.set(objA, "p2.p2_2.p2_2_3", {});
            ot.navigate.set(objA, "p2.p2_2.p2_2_4.a.b.c", {d: true});

            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_2")).toBe(false);
            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_3")).toBe(true);
            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_4.a.b.c")).toBe(true);
        });
    });


    describe("a unbindInherit method", function () {
        var objA, objB;
        objA = {
            p1: true,
            p2: {
                p2_1: true,
                p2_2: {
                    p2_2_1: true
                }
            }
        };
        objB = ot.unbindInherit(ot.boundInherit(objA));

        it("which updates bound-inherited children when the parent has a new object", function () {
            ot.navigate.set(objA, "p2.p2_2.p2_2_2", true);
            ot.navigate.set(objA, "p2.p2_2.p2_2_3", {});
            ot.navigate.set(objA, "p2.p2_2.p2_2_4.a.b.c", {d: true});

            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_2")).toBe(false);
            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_3")).toBe(false);
            expect(ot.navigate.hasOwn(objB, "p2.p2_2.p2_2_4.a.b.c")).toBe(false);
        });
    });
});