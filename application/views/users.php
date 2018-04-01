<h2><?php echo $title; ?></h2>

<?php foreach ($news as $news_item): ?>

        <h3><?php echo $news_item['firstname']; ?></h3>
        <div class="main">
                <?php echo $news_item['lastname']; ?>
        </div>
        

<?php endforeach; ?>