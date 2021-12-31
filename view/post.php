<?php
if (!isset($post) || !is_array($post)) {
  header('Location: index.php');
  exit();
}
$title = "Electicism. - Post";
ob_start();
session_start();
?>
  <section class="s-content s-content--narrow s-content--no-padding-bottom">
    <article class="row format-standard">
      <div class="s-content__header col-full">
        <h1 class="s-content__header-title">
          <?php echo $post['title'] ?>
        </h1>
        <ul class="s-content__header-meta">
          <li class="date"><?php
            setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
            echo strftime("%d %B %Y", strtotime($post['createdThe']));
            ?></li>
          <!--<li class="cat">
            Catégorie :
            <a href="#0">Lifestyle</a>
            <a href="#0">Travel</a>
          </li>-->
        </ul>
      </div>

      <div class="s-content__media col-full">
        <div class="s-content__post-thumb" style="text-align: center">
          <img src="public/images/post/<?php echo $post['thumbnail'] ?>"
               sizes="(max-width: 2000px) 100vw, 2000px" alt="">
        </div>
      </div>

      <div class="col-full s-content__main">

        <?php
        $content = explode("\n", $post['content']);
        foreach ($content as $key => $ctt) {
          if (trim($ctt)) {
            if ($key === 0) { ?>
              <p class="lead"><?php echo $ctt ?></p>
            <?php } else { ?>
              <p><?php echo $ctt ?></p>
            <?php }
            $array[] = $ctt;
          }
        }
        ?>

        <!-- list of post's tags -->
        <!--<p class="s-content__tags">
          <span>Les Tags</span>
          <span class="s-content__tag-list">
            <a href="#0">orci</a>
            <a href="#0">lectus</a>
            <a href="#0">varius</a>
            <a href="#0">turpis</a>
          </span>
        </p>-->

        <!-- Author information -->
        <div class="s-content__author">
          <img src="public/images/avatars/user-03.jpg" alt="">
          <div class="s-content__author-about">
            <h4 class="s-content__author-name">
              <a href="#0">Jonathan Doe</a>
            </h4>

            <p>Alias aperiam at debitis deserunt dignissimos dolorem doloribus, fuga fugiat impedit laudantium magni
              maxime nihil nisi quidem quisquam sed ullam voluptas voluptatum. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit.
            </p>

            <ul class="s-content__author-social">
              <li><a href="#0">Facebook</a></li>
              <li><a href="#0">Twitter</a></li>
              <li><a href="#0">GooglePlus</a></li>
              <li><a href="#0">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </article>

    <!-- list of comments -->
    <div class="comments-wrap">
      <div id="comments" class="row">
        <div class="col-full">
          <h3 class="h2"><?php
            $count = count($comment);
            echo $count . " Commentaire" . ($count > 1 ? "s" : "") ?>
          </h3>

          <!-- commentlist -->
          <ol class="commentlist">
            <?php foreach ($comment as $com) : ?>
              <li class="depth-1 comment">
                <div class="comment__content">
                  <div class="comment__info">
                    <cite><?php echo $com['username'] ?></cite>
                    <div class="comment__meta">
                      <time class="comment__time"><?php
                        echo strftime("%d %B %Y", strtotime($com['publishedThe']))
                        ?>
                      </time>
                    </div>
                  </div>

                  <div class="comment__text">
                    <p><?php echo $com['message'] ?></p>
                  </div>
                </div>
                <?php if (isset($_SESSION) && !empty($_SESSION)) : ?>
                <form action="admin/index.php?page=deleteCom" method="post">
                  <input type="hidden" value="<?php echo $com['id'] ?>" name="commID">
                  <input type="hidden" value="<?php echo $post['id'] ?>" name="postID">
                  <button type="submit" class="btn btn-link deleteComment">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </form>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ol>

          <!-- Comment form
          ================================================== -->
          <div class="respond">
            <h3 class="h2">Ajouter un commentaire</h3>

            <form name="contactForm" id="contactForm" method="post" action="admin/index.php?page=createComment">
              <fieldset>
                <div class="form-field">
                  <input name="cName" type="text" id="cName" class="full-width"
                         placeholder="Votre nom" value="" style="color: black">
                </div>

                <div class="message form-field">
                  <textarea name="cMessage" id="cMessage" class="full-width"
                            placeholder="Votre message" style="color: black"></textarea>
                </div>

                <input type="hidden" name="postID" value="<?php echo $post['id'] ?>">
                <button type="submit" class="submit btn--primary btn--large full-width">Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div> <!-- end row comments -->
    </div> <!-- end comments-wrap -->
  </section> <!-- s-content -->

  <section class="s-extra">
    <div class="row top">
      <div class="col-eight md-six tab-full popular">
        <h3>Popular Posts</h3>
        <div class="block-1-2 block-m-full popular__posts">

          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/wheel-150.jpg" alt="">
            </a>
            <h5><a href="#0">Visiting Theme Parks Improves Your Health.</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span><a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-19">Dec 19, 2017</time></span>
            </section>
          </article>

          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/shutterbug-150.jpg" alt="">
            </a>
            <h5><a href="#0">Key Benefits Of Family Photography.</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-18">Dec 18, 2017</time></span>
            </section>
          </article>
          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/cookies-150.jpg" alt="">
            </a>
            <h5><a href="#0">Absolutely No Sugar Oatmeal Cookies.</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-16">Dec 16, 2017</time></span>
            </section>
          </article>
          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/beetle-150.jpg" alt="">
            </a>
            <h5><a href="#0">Throwback To The Good Old Days.</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-16">Dec 16, 2017</time></span>
            </section>
          </article>
          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/tulips-150.jpg" alt="">
            </a>
            <h5><a href="#0">10 Interesting Facts About Caffeine.</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-14">Dec 14, 2017</time></span>
            </section>
          </article>
          <article class="col-block popular__post">
            <a href="#0" class="popular__thumb">
              <img src="public/images/thumbs/small/salad-150.jpg" alt="">
            </a>
            <h5><a href="#0">Healthy Mediterranean Salad Recipes</a></h5>
            <section class="popular__meta">
              <span class="popular__author"><span>By</span> <a href="#0"> John Doe</a></span>
              <span class="popular__date"><span>on</span> <time datetime="2017-12-12">Dec 12, 2017</time></span>
            </section>
          </article>
        </div> <!-- end popular_posts -->
      </div> <!-- end popular -->

      <div class="col-four md-six tab-full about">
        <h3>About Philosophy</h3>

        <p>
          Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Pellentesque in ipsum id
          orci porta dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut
          lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
        </p>

        <ul class="about__social">
          <li>
            <a href="#0"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#0"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#0"><i class="fa fa-instagram" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#0"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
          </li>
        </ul> <!-- end header__social -->
      </div> <!-- end about -->

    </div> <!-- end row -->

    <div class="row bottom tags-wrap">
      <div class="col-full tags">
        <h3>Tags</h3>

        <div class="tagcloud">
          <a href="#0">Salad</a>
          <a href="#0">Recipe</a>
          <a href="#0">Places</a>
          <a href="#0">Tips</a>
          <a href="#0">Friends</a>
          <a href="#0">Travel</a>
          <a href="#0">Exercise</a>
          <a href="#0">Reading</a>
          <a href="#0">Running</a>
          <a href="#0">Self-Help</a>
          <a href="#0">Vacation</a>
        </div> <!-- end tagcloud -->
      </div> <!-- end tags -->
    </div> <!-- end tags-wrap -->

  </section> <!-- end s-extra -->
<?php
$content = ob_get_clean();
require 'template/general.php';