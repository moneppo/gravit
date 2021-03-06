(function () {
    gDevelopment.tests.push({
        title: 'Create Multiple Pages',
        test: function () {
            gApp.createNewDocument();
            var document = gApp.getActiveDocument();
            var scene = document.getScene();
            scene.removeChild(scene.getActivePage());

            var masterPage = new GPage();
            var insertPos = scene.getPageInsertPosition();
            var insertSize = new GPoint(800, 600);

            masterPage.setProperties([
                'name',
                'x',
                'y',
                'w',
                'h'
            ], [
                'Master-Page',
                insertPos.getX() + 100,
                insertPos.getY() + 100,
                insertSize.getX(),
                insertSize.getY()
            ]);

            var layer = new GLayer();
            layer.setFlag(GNode.Flag.Active);
            masterPage.appendChild(layer);

            var rectangle = new GRectangle();
            rectangle.setProperty('trf', new GTransform(insertSize.getX() / 2, 0, 0, 50, 100 + insertSize.getX() / 2, 100 + 50));
            layer.appendChild(rectangle);


            var slice = new GSlice();
            slice.setProperty('trf', new GTransform(50, 0, 0, 50, 100 + 50 / 2, 100 + 50));
            layer.appendChild(slice);

            scene.appendChild(masterPage);

            for (var i = 0; i < 10; ++i) {
                var page = new GPage();
                insertPos = scene.getPageInsertPosition();

                page.setProperties([
                    'name',
                    'x',
                    'y',
                    'w',
                    'h',
                    'msref'
                ], [
                    'Page-' + i,
                    insertPos.getX(),
                    insertPos.getY(),
                    insertSize.getX(),
                    insertSize.getY(),
                    masterPage.getReferenceId()
                ]);

                var text = new GText();
                text.fromHtml('<p style="font-size:72px">Page Number ' + i + '</p>');

                var textPaintBBox = text.getPaintBBox();
                text.setProperties(['trf'], [new GTransform(1, 0, 0, 1,
                    insertPos.getX() + (insertSize.getX() - textPaintBBox.getWidth()) / 2,
                    insertPos.getY() + (insertSize.getY() - textPaintBBox.getHeight()) / 2)]);

                var layer = new GLayer();
                layer.setFlag(GNode.Flag.Active);
                layer.appendChild(text);

                page.appendChild(layer);

                scene.appendChild(page);

                if (i === 0) {
                    page.setFlag(GNode.Flag.Active);
                }
            }
        }
    });
})();
